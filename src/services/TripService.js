import {
    collection,
    doc,
    getDocs,
    query,
    runTransaction,
    where,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

import { formatDateTime } from "../utils";

export class TripService {
    static async start(booking) {
        const bookingRef = doc(db, "bookings", booking.id);
        const carRef = doc(db, "cars", booking.carId);

        return await runTransaction(db, async (transaction) => {
            const now = new Date();

            const bookingSnap = await transaction.get(bookingRef);
            const carSnap = await transaction.get(carRef);

            if (!bookingSnap.exists()) {
                throw new Error("Бронювання не знайдено!");
            }

            if (!carSnap.exists()) {
                throw new Error("Автомобіль не знайдено!");
            }

            const currentBooking = bookingSnap.data();
            const car = carSnap.data();

            if (currentBooking.tripId) {
                throw new Error("Поїздку вже розпочато!");
            }

            const plannedStart = currentBooking.plannedStart?.toDate?.() ?? currentBooking.plannedStart;
            const plannedEnd = currentBooking.plannedEnd?.toDate?.() ?? currentBooking.plannedEnd;

            if (plannedStart && now < plannedStart) {
                throw new Error(
                    `Поїздку можна розпочати з ${formatDateTime(plannedStart, true)}`
                );
            }

            if (plannedEnd && now > plannedEnd) {
                transaction.update(bookingRef, { status: "expired" });
                throw new Error("Термін бронювання минув!");
            }

            if (currentBooking.status !== "confirmed") {
                throw new Error("Бронювання неактивне!");
            }

            if (car.status !== "available") {
                throw new Error("Автомобіль недоступний!");
            }

            const basePrice = currentBooking.price || 0;

            const tripRef = doc(collection(db, "trips"));

            transaction.set(tripRef, {
                carId: currentBooking.carId,
                userId: currentBooking.userId,
                bookingId: booking.id,
                status: "active",
                price: basePrice,
                additionalCharge: 0,
                totalPrice: basePrice,
                actualStart: serverTimestamp(),
                startLocation: car.location || null,
            });

            transaction.update(carRef, { status: "rented" });

            return tripRef.id;
        });
    }

    static async end(tripId) {
        const tripRef = doc(db, "trips", tripId);

        return await runTransaction(db, async (transaction) => {
            const tripSnap = await transaction.get(tripRef);

            if (!tripSnap.exists()) {
                throw new Error("Поїздку не знайдено!");
            }

            const trip = tripSnap.data();

            if (trip.status !== "active") {
                throw new Error("Поїздка вже завершена!");
            }

            if (!trip.conditionStartId) {
                throw new Error("Початкову фотофіксацію не виконано!");
            }

            if (!trip.conditionEndId) {
                throw new Error("Кінцеву фотофіксацію не виконано!");
            }

            const carRef = doc(db, "cars", trip.carId);
            const carSnap = await transaction.get(carRef);

            if (!carSnap.exists()) {
                throw new Error("Автомобіль не знайдено!");
            }

            const car = carSnap.data();

            if (!car.isLocked) {
                throw new Error("Автомобіль має бути заблокований!");
            }

            const startConditionRef = doc(db, "carConditions", trip.conditionStartId);
            const startConditionSnap = await transaction.get(startConditionRef);

            if (!startConditionSnap.exists()) {
                throw new Error("Початкову фотофіксацію не знайдено!");
            }

            const endConditionRef = doc(db, "carConditions", trip.conditionEndId);
            const endConditionSnap = await transaction.get(endConditionRef);

            if (!endConditionSnap.exists()) {
                throw new Error("Кінцеву фотофіксацію не знайдено!");
            }

            const bookingRef = doc(db, "bookings", trip.bookingId);
            const bookingSnap = await transaction.get(bookingRef);

            if (!bookingSnap.exists()) {
                throw new Error("Бронювання не знайдено!");
            }

            const booking = bookingSnap.data();

            const now = Date.now();
            const plannedEnd = booking.plannedEnd.toMillis?.() ?? booking.plannedEnd.getTime();

            const basePrice = trip.basePrice || booking.price || 0;

            let additionalCharge = 0;

            if (now > plannedEnd) {
                const msPerDay = 86400000;
                const overdueDays = Math.ceil((now - plannedEnd) / msPerDay);

                const penaltyRate = 2;
                additionalCharge = overdueDays * car.pricePerDay * penaltyRate;
            }

            const totalPrice = basePrice + additionalCharge;

            const hasAdditionalCharge = additionalCharge > 0;

            transaction.update(tripRef, {
                additionalCharge,
                totalPrice,
                actualEnd: serverTimestamp(),
                endLocation: car.location || null,
                status: hasAdditionalCharge ? "awaiting_payment" : "completed",
            });

            transaction.update(carRef, {
                status: "available",
                isLocked: true,
                mileage: Number(startConditionSnap.data().mileage)
            });

            transaction.update(bookingRef, {status: "completed"});

            return {
                basePrice,
                additionalCharge,
                totalPrice,
                hasAdditionalCharge
            };
        });
    }

    static async pay(tripId) {
        const tripRef = doc(db, "trips", tripId);

        await runTransaction(db, async (transaction) => {
            const tripSnap = await transaction.get(tripRef);

            if (!tripSnap.exists()) {
                throw new Error("Поїздку не знайдено!");
            }

            const trip = tripSnap.data();

            if (trip.status !== "awaiting_payment") {
                throw new Error("Оплата недоступна!");
            }

            transaction.update(tripRef, { status: "completed" });
        });
    }

    static async delete(tripId) {
        const tripRef = doc(db, "trips", tripId);

        await runTransaction(db, async (transaction) => {
            const tripSnap = await transaction.get(tripRef);

            if (!tripSnap.exists()) {
                throw new Error("Поїздку не знайдено!");
            }

            const trip = tripSnap.data();

            if (trip.status === "active") {
                throw new Error("Неможливо видалити активну поїздку!");
            }

            const carRef = doc(db, "cars", trip.carId);
            const carSnap = await transaction.get(carRef);

            if (!carSnap.exists()) {
                throw new Error("Автомобіль не знайдено!");
            }

            transaction.update(carRef, { status: "available" });
            transaction.delete(tripRef);
        });
    }

    static async getActiveTripByUser(userId) {
        const q = query(
            collection(db, "trips"),
            where("userId", "==", userId),
            where("status", "==", "active")
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) return null;

        const docSnap = snapshot.docs[0];

        return {
            id: docSnap.id,
            ...docSnap.data()
        }
    }

    static async setRating(tripId, rating) {
        if (rating < 1 || rating > 5) {
            throw new Error("Некоректний рейтинг!");
        }

        const tripRef = doc(db, "trips", tripId);

        await runTransaction(db, async (transaction) => {
            const tripSnap = await transaction.get(tripRef);

            if (!tripSnap.exists()) {
                throw new Error("Поїздку не знайдено!");
            }

            const trip = tripSnap.data();

            if (trip.rating != null) {
                throw new Error("Оцінку вже виставлено!");
            }

            const carRef = doc(db, "cars", trip.carId);
            const carSnap = await transaction.get(carRef);

            if (!carSnap.exists()) {
                throw new Error("Автомобіль не знайдено!");
            }

            const car = carSnap.data();

            const currentAvg = car.averageRating || 0;
            const currentCount = car.ratingCount || 0;

            const newCount = currentCount + 1;
            const newAvg = (currentAvg * currentCount + rating) / newCount;

            transaction.update(tripRef, { rating });

            transaction.update(carRef, {
                averageRating: Number(newAvg.toFixed(1)),
                ratingCount: newCount
            });
        });
    }
}