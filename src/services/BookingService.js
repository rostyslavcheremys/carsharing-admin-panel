import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc,
    runTransaction
} from "firebase/firestore";

import { db } from "../firebase";

export class BookingService {
    static async create(data) {
        return await runTransaction(db, async (transaction) => {
            const now = Date.now();

            const userBookingsRef = collection(db, "bookings");

            const userQuery = query(
                userBookingsRef,
                where("userId", "==", data.userId),
                where("status", "in", ["pending", "confirmed"])
            );

            const userSnapshot = await getDocs(userQuery);

            const hasActiveBooking = userSnapshot.docs.some((docSnap) => {
                const b = docSnap.data();

                const expiresAt = b.expiresAt?.toMillis?.() ?? 0;

                const isPendingActive =
                    b.status === "pending" && expiresAt > now;

                const isConfirmed = b.status === "confirmed";

                return isPendingActive || isConfirmed;
            });

            if (hasActiveBooking) {
                throw new Error("У вас вже є активне бронювання!");
            }

            const carRef = doc(db, "cars", data.carId);
            const carSnap = await transaction.get(carRef);

            if (!carSnap.exists()) {
                throw new Error("Автомобіль не знайдено!");
            }

            const car = carSnap.data();

            if (car.status === "rented") {
                throw new Error("Автомобіль вже зайнятий!");
            }

            const bookingRef = doc(collection(db, "bookings"));

            transaction.set(bookingRef, {
                ...data,
                status: "pending",
                plannedStart: new Date(data.plannedStart),
                plannedEnd: new Date(data.plannedEnd),
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 3 * 60 * 1000),
            });

            return {
                id: bookingRef.id,
                ...data,
            };
        });
    }

    static async confirm(bookingId) {
        await runTransaction(db, async (transaction) => {
            const bookingRef = doc(db, "bookings", bookingId);
            const bookingSnap = await transaction.get(bookingRef);

            if (!bookingSnap.exists()) {
                throw new Error("Бронювання не знайдено!");
            }

            const booking = bookingSnap.data();

            if (booking.status !== "pending") {
                throw new Error("Бронювання вже неактивне!");
            }

            const now = Date.now();
            const expiresAt = booking.expiresAt?.toMillis?.() ?? 0;

            if (expiresAt < now) {
                throw new Error("Час на оплату завершився!");
            }

            const carRef = doc(db, "cars", booking.carId);
            const carSnap = await transaction.get(carRef);

            if (!carSnap.exists()) {
                throw new Error("Автомобіль не знайдено!");
            }

            const car = carSnap.data();

            if (car.status === "rented") {
                transaction.update(bookingRef, { status: "cancelled" });
                throw new Error("Автомобіль вже зайнятий!");
            }

            transaction.update(bookingRef, { status: "confirmed" });
            transaction.update(carRef, { status: "rented" });
        });
    }

    static async cancel(bookingId) {
        const bookingRef = doc(db, "bookings", bookingId);
        const bookingSnap = await getDoc(bookingRef);

        if (!bookingSnap.exists()) return;

        const booking = bookingSnap.data();

        if (booking.status !== "pending") return;

        await updateDoc(bookingRef, {
            status: "cancelled",
        });
    }

    static async getActiveBookingByUser(userId) {
        const q = query(
            collection(db, "bookings"),
            where("userId", "==", userId),
            where("status", "==", "confirmed")
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) return null;

        const doc = snapshot.docs[0];

        return {
            id: doc.id,
            ...doc.data()
        }
    }
}