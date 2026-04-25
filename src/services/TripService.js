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
                actualStart: new Date(),
                startLocation: car.location || null,
            }
        );

        return tripRef.id;
    }

    static async end(tripId, endData = {}) {
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

            const carRef = doc(db, "cars", trip.carId);
            const carSnap = await getDoc(carRef);
            const car = carSnap.data();

            const bookingRef = doc(
                db,
                "bookings",
                trip.bookingId
            );

            transaction.update(
                tripRef,
                {
                    ...endData,
                    status: "completed",
                    actualEnd: new Date(),
                    endLocation: car.location || null,
                }
            );

            transaction.update(carRef, { status: "available" });
            transaction.update(bookingRef, { status: "completed" });
        });
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