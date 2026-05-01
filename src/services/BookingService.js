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

import { db, auth } from "../firebase";

export class BookingService {
    static async create(data) {
        return await runTransaction(db, async (transaction) => {
            const userId = auth.currentUser?.uid;

            if (!userId) {
                throw new Error("Користувач не авторизований!");
            }

            const now = Date.now();

            const userBookingsRef = collection(db, "bookings");

            const userQuery = query(
                userBookingsRef,
                where("userId", "==", userId),
                where("status", "in", ["awaiting_payment", "confirmed"])
            );

            const userSnapshot = await getDocs(userQuery);

            const hasActiveBooking = userSnapshot.docs.some((docSnap) => {
                const b = docSnap.data();

                const expiresAt = b.expiresAt?.toMillis?.() ?? 0;

                const isAwaitingPayment =
                    b.status === "awaiting_payment" && expiresAt > now;

                const isConfirmed = b.status === "confirmed";

                return isAwaitingPayment || isConfirmed;
            });

            if (hasActiveBooking) {
                throw new Error("У вас вже є активне бронювання!");
            }

            const carRef = doc(db, "cars", data.carId);
            const carSnap = await transaction.get(carRef);

            if (!carSnap.exists()) {
                throw new Error("Автомобіль не знайдено!");
            }

            const bookingsRef = collection(db, "bookings");

            const bookingsQuery = query(
                bookingsRef,
                where("carId", "==", data.carId),
                where("status", "in", ["awaiting_payment", "confirmed"])
            );

            const bookingsSnapshot = await getDocs(bookingsQuery);

            const newStart = new Date(data.plannedStart);

            const newEnd = new Date(data.plannedEnd);

            const hasConflict = bookingsSnapshot.docs.some(docSnap => {
                const b = docSnap.data();
                const expiresAt = b.expiresAt?.toMillis?.() ?? 0;

                const isAwaitingPaymentActive = b.status === "awaiting_payment" && expiresAt > now;
                const isConfirmed = b.status === "confirmed";

                if (!isAwaitingPaymentActive && !isConfirmed) return false;

                const bStart = b.plannedStart.toDate();
                const bEnd = b.plannedEnd.toDate();

                return newStart <= bEnd && newEnd >= bStart;
            });

            if (hasConflict) {
                throw new Error("Автомобіль вже заброньований на обраний період!");
            }

            const bookingRef = doc(collection(db, "bookings"));

            transaction.set(bookingRef, {
                ...data,
                userId,
                status: "awaiting_payment",
                plannedStart: new Date(data.plannedStart),
                plannedEnd: new Date(data.plannedEnd),
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 3 * 60 * 1000)
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

            if (booking.status !== "awaiting_payment") {
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

            transaction.update(bookingRef, { status: "confirmed" });
        });
    }

    static async cancel(bookingId) {
        const bookingRef = doc(db, "bookings", bookingId);
        const bookingSnap = await getDoc(bookingRef);

        if (!bookingSnap.exists()) return;

        const booking = bookingSnap.data();

        if (booking.status !== "awaiting_payment") return;

        await updateDoc(bookingRef, {
            status: "cancelled",
        });
    }

    static async delete(bookingId) {
        await runTransaction(db, async (transaction) => {
            const bookingRef = doc(db, "bookings", bookingId);
            const bookingSnap = await transaction.get(bookingRef);

            if (!bookingSnap.exists()) {
                throw new Error("Бронювання не знайдено!");
            }

            const booking = bookingSnap.data();

            if (booking.status === "confirmed") {
                const carRef = doc(db, "cars", booking.carId);

                transaction.update(carRef, {
                    status: "available"
                });
            }

            transaction.delete(bookingRef);
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