import {
    collection,
    doc,
    query,
    where,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    runTransaction,
} from "firebase/firestore";

import { db } from "../firebase";

export class TripService {
    static async start(booking) {
        const tripQuery = query(
            collection(db, "trips"),
            where("bookingId", "==", booking.id),
            where("status", "==", "active")
        );

        const tripSnapshot = await getDocs(tripQuery);

        if (!tripSnapshot.empty) {
            throw new Error("Поїздку вже розпочато!");
        }

        const carRef = doc(db, "cars", booking.carId);
        const carSnap = await getDoc(carRef);

        if (!carSnap.exists()) {
            throw new Error("Автомобіль не знайдено!");
        }

        const car = carSnap.data();

        if (car.status !== "rented") {
            throw new Error("Автомобіль не заброньований!");
        }

        const tripRef = await addDoc(
            collection(db, "trips"),
            {
                carId: booking.carId,
                userId: booking.userId,
                bookingId: booking.id,
                status: "active",
                price: booking.price || 0,
                additionalCharge: 0,
                totalPrice: booking.price || 0,
                actualStart: new Date(),
                startLocation: car.location || null,
            }
        );

        return tripRef.id;
    }

    static async end(tripId) {
        let hasAdditionalCharge = false;
        let price = 0;
        let additionalCharge = 0;
        let totalPrice = 0;

        await runTransaction(db, async (transaction) => {
            const tripRef = doc(db, "trips", tripId);
            const tripSnap = await transaction.get(tripRef);

            if (!tripSnap.exists()) {
                throw new Error("Поїздку не знайдено!");
            }

            const trip = tripSnap.data();

            if (trip.status !== "active") {
                throw new Error("Поїздка вже завершена!");
            }

            if (!trip.conditionStartId) {
                throw new Error(
                    "Перед завершенням поїздки необхідно виконати початкову фотофіксацію стану автомобіля!"
                );
            }

            if (!trip.conditionEndId) {
                throw new Error(
                    "Перед завершенням поїздки необхідно виконати кінцеву фотофіксацію стану автомобіля!"
                );
            }

            const carRef = doc(db, "cars", trip.carId);
            const carSnap = await transaction.get(carRef);

            if (!carSnap.exists()) {
                throw new Error("Автомобіль не знайдено!");
            }

            const car = carSnap.data();

            const bookingRef = doc(db, "bookings", trip.bookingId);

            const bookingSnap = await transaction.get(bookingRef);

            if (!bookingSnap.exists()) {
                throw new Error("Бронювання не знайдено!");
            }

            const booking = bookingSnap.data();

            const actualEnd = new Date();
            const plannedEnd = booking.plannedEnd.toDate();

            price = trip.basePrice || booking.price || 0;
            totalPrice = price;

            if (actualEnd > plannedEnd) {
                const msPerDay = 24 * 60 * 60 * 1000;
                const overdueDays = Math.ceil((actualEnd - plannedEnd) / msPerDay);

                additionalCharge = overdueDays * car.pricePerDay * 2;
                totalPrice += additionalCharge;
                hasAdditionalCharge = true;
            }

            transaction.update(
                tripRef,
                {
                    additionalCharge,
                    totalPrice,
                    actualEnd,
                    endLocation: car.location || null,
                    status: hasAdditionalCharge ? "awaiting_payment" : "completed",
                }
            );

            transaction.update(carRef, { status: "available" });
            transaction.update(bookingRef, { status: "completed" });
        });

        return {
            hasAdditionalCharge,
            price,
            additionalCharge,
            totalPrice
        }
    }

    static async pay(tripId) {
        const tripRef = doc(db, "trips", tripId);
        await updateDoc(tripRef, { status: "completed" });
    }

    static async delete(tripId) {
        const tripRef = doc(db, "trips", tripId);
        const tripSnap = await getDoc(tripRef);

        if (!tripSnap.exists()) {
            throw new Error("Поїздку не знайдено!");
        }

        const trip = tripSnap.data();

        if (trip.status === "active") {
            throw new Error("Неможливо видалити активну поїздку!");
        }

        const carRef = doc(db, "cars", trip.carId);

        await updateDoc(carRef, {
            status: "available",
        });

        await deleteDoc(tripRef);
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
}