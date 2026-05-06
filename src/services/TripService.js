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

import {
    assert,
    toDate,
    formatDateTime
} from "../utils";

export class TripService {
    static async start(bookingData) {
        return await runTransaction(db, async (transaction) => {
            const bookingRef = doc(db, "bookings", bookingData.id);
            const bookingSnap = await transaction.get(bookingRef);

            assert(bookingSnap.exists(), "Бронювання не знайдено!");

            const booking = bookingSnap.data();

            const carRef = doc(db, "cars", bookingData.carId);
            const carSnap = await transaction.get(carRef);

            assert(carSnap.exists(), "Автомобіль не знайдено!");

            const car = carSnap.data();

            const now = Date.now();

            assert(!booking.tripId, "Поїздку вже розпочато!");

            const plannedStart = toDate(booking.plannedStart);

            if (plannedStart && now < plannedStart) {
                throw new Error(`Поїздку можна розпочати з ${formatDateTime(plannedStart, true)}`);
            }

            const plannedEnd = toDate(booking.plannedEnd);

            if (plannedEnd && now > plannedEnd) {
                transaction.update(bookingRef, { status: "expired" });
                throw new Error("Термін бронювання минув!");
            }

            assert(booking.status === "confirmed", "Бронювання неактивне!");
            assert(car.status === "available", "Автомобіль недоступний!");

            const basePrice = booking.price || 0;

            const tripRef = doc(collection(db, "trips"));

            transaction.set(tripRef, {
                carId: booking.carId,
                userId: booking.userId,
                bookingId: bookingData.id,
                status: "active",
                price: basePrice,
                additionalCharge: 0,
                totalPrice: basePrice,
                actualStart: serverTimestamp(),
                startLocation: car.location || null,
            });

            transaction.update(bookingRef, { tripId: tripRef.id });

            transaction.update(carRef, { status: "rented" });

            return tripRef.id;
        });
    }

    static async end(tripId) {
        return await runTransaction(db, async (transaction) => {
            const tripRef = doc(db, "trips", tripId);
            const tripSnap = await transaction.get(tripRef);

            assert(tripSnap.exists(), "Поїздку не знайдено!");

            const trip = tripSnap.data();

            assert(trip.status === "active", "Поїздка вже завершена!");

            assert(trip.conditionStartId, "Початкову фотофіксацію не виконано!");
            assert(trip.conditionEndId, "Кінцеву фотофіксацію не виконано!");

            const carRef = doc(db, "cars", trip.carId)
            const carSnap = await transaction.get(carRef);

            assert(carSnap.exists(), "Автомобіль не знайдено!");

            const car = carSnap.data();

            assert(car.isLocked, "Автомобіль має бути заблокований!");

            const startConditionRef = doc(db, "carConditions", trip.conditionStartId);
            const startConditionSnap = await transaction.get(startConditionRef);

            assert(startConditionSnap.exists(), "Початкову фотофіксацію не знайдено!");

            const endConditionRef = doc(db, "carConditions", trip.conditionEndId);
            const endConditionSnap = await transaction.get(endConditionRef);

            assert(endConditionSnap.exists(), "Кінцеву фотофіксацію не знайдено!");

            const bookingRef = doc(db, "bookings", trip.bookingId);
            const bookingSnap = await transaction.get(bookingRef);

            assert(bookingSnap.exists(), "Бронювання не знайдено!");

            const booking = bookingSnap.data();

            const now = Date.now();

            const plannedEnd = toDate(booking.plannedEnd);

            const basePrice = trip.basePrice || booking.price || 0;

            let additionalCharge = 0;

            if (now > plannedEnd) {
                const msPerDay = 86400000;
                const overdueDays = Math.ceil((now - plannedEnd) / msPerDay);
                console.log(overdueDays);

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

            transaction.update(bookingRef, { status: "completed" });

            return {
                basePrice,
                additionalCharge,
                totalPrice,
                hasAdditionalCharge
            };
        });
    }

    static async pay(tripId) {
        await runTransaction(db, async (transaction) => {
            const tripRef = doc(db, "trips", tripId);
            const tripSnap = await transaction.get(tripRef);

            assert(tripSnap.exists(), "Поїздку не знайдено!");

            const trip = tripSnap.data();

            assert(trip.status === "awaiting_payment", "Оплата недоступна!");

            transaction.update(tripRef, { status: "completed" });
        });
    }

    static async delete(tripId) {
        await runTransaction(db, async (transaction) => {
            const tripRef = doc(db, "trips", tripId);
            const tripSnap = await transaction.get(tripRef);

            assert(tripSnap.exists(), "Поїздку не знайдено!");

            const trip = tripSnap.data();

            assert(trip.status === "completed", "Поїздка має бути завершена для видалення!");

            const carRef = doc(db, "cars", trip.carId);
            const carSnap = await transaction.get(carRef);

            assert(carSnap.exists(), "Автомобіль не знайдено!");

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
        assert(rating >= 1 && rating <= 5, "Рейтинг має бути від 1 до 5");

        await runTransaction(db, async (transaction) => {
            const tripRef = doc(db, "trips", tripId);
            const tripSnap = await transaction.get(tripRef);

            assert(tripSnap.exists(), "Поїздку не знайдено!");

            const trip = tripSnap.data();

            assert(trip.rating == null, "Оцінку вже виставлено!");

            const carRef = doc(db, "cars", trip.carId);
            const carSnap = await transaction.get(carRef);

            assert(carSnap.exists(), "Автомобіль не знайдено!");

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