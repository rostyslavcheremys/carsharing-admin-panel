import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc,
    runTransaction,
    serverTimestamp
} from "firebase/firestore";

import { db, auth } from "../firebase";

import { assert } from "../utils";

export class BookingService {
    static async create(data) {
        return await runTransaction(db, async (transaction) => {
            const userId = auth.currentUser?.uid;

            assert(userId, "Користувач не авторизований!");

            const now = Date.now();

            const userSnapshot = await getDocs(
                query(
                    collection(db, "bookings"),
                    where("userId", "==", userId),
                    where("status", "in", ["awaiting_payment", "confirmed"])
                )
            );

            const hasActiveBooking = userSnapshot.docs.some((docSnap) => {
                const booking = docSnap.data();

                const expiresAt = booking.expiresAt?.toMillis?.() ?? 0;

                const isActiveAwaiting = booking.status === "awaiting_payment" && expiresAt > now;

                const isConfirmed = booking.status === "confirmed";

                return isActiveAwaiting || isConfirmed;
            });

            assert(!hasActiveBooking, "У вас вже є активне бронювання!");

            const carRef = doc(db, "cars", data.carId);
            const carSnap = await transaction.get(carRef);

            assert(carSnap.exists(), "Автомобіль не знайдено!");

            const newStart = new Date(data.plannedStart);
            const newEnd = new Date(data.plannedEnd);

            const bookingsSnapshot = await getDocs(
                query(
                    collection(db, "bookings"),
                    where("carId", "==", data.carId),
                    where("status", "in", ["awaiting_payment", "confirmed"])
                )
            );

            const hasConflict = bookingsSnapshot.docs.some((docSnap) => {
                const booking = docSnap.data();

                const expiresAt = booking.expiresAt?.toMillis?.() ?? 0;

                const isActiveAwaiting = booking.status === "awaiting_payment" && expiresAt > now;

                const isConfirmed = booking.status === "confirmed";

                if (!isActiveAwaiting && !isConfirmed) return false;

                const bStart = new Date(booking.plannedStart);
                const bEnd = new Date(booking.plannedEnd);

                return newStart <= bEnd && newEnd >= bStart;
            });

            assert(!hasConflict, "Автомобіль вже заброньований на обраний період!");

            const bookingRef = doc(collection(db, "bookings"));

            transaction.set(bookingRef, {
                ...data,
                userId,
                status: "awaiting_payment",
                plannedStart: newStart,
                plannedEnd: newEnd,
                createdAt: serverTimestamp(),
                expiresAt: new Date(Date.now() + 3 * 60 * 1000)
            });

            return {
                id: bookingRef.id,
                ...data,
            }
        });
    }

    static async confirm(bookingId) {
        await runTransaction(db, async (transaction) => {
            const bookingRef = doc(db, "bookings", bookingId);
            const bookingSnap = await transaction.get(bookingRef);

            assert(bookingSnap.exists(), "Бронювання не знайдено!");

            const booking = bookingSnap.data();

            assert(booking.status === "awaiting_payment", "Бронювання неактивне!");

            assert(booking.expiresAt, "Час оплати не вказано!");

            const now = Date.now();
            const expiresAt = booking.expiresAt.toMillis();

            assert(now <= expiresAt, "Час на оплату завершився!");

            const carRef = doc(db, "cars", booking.carId);
            const carSnap = await transaction.get(carRef);

            assert(carSnap.exists(), "Автомобіль не знайдено!");

            transaction.update(bookingRef, { status: "confirmed" });
        });
    }

    static async cancel(bookingId) {
        const bookingRef = doc(db, "bookings", bookingId);
        const bookingSnap = await getDoc(bookingRef);

        assert(bookingSnap.exists(), "Бронювання не знайдено!");

        const booking = bookingSnap.data();

        assert(booking.status === "awaiting_payment", "Скасування недоступне!");

        await updateDoc(bookingRef, { status: "cancelled" });
    }

    static async delete(bookingId) {
        await runTransaction(db, async (transaction) => {
            const bookingRef = doc(db, "bookings", bookingId);
            const bookingSnap = await transaction.get(bookingRef);

            assert(bookingSnap.exists(), "Бронювання не знайдено!");

            const booking = bookingSnap.data();

            if (booking.carId && booking.status === "confirmed") {
                const carRef = doc(db, "cars", booking.carId);
                const carSnap = await transaction.get(carRef);

                assert(carSnap.exists(), "Автомобіль не знайдено!");

                transaction.update(carRef, { status: "available" });
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

        const docSnap = snapshot.docs[0];

        return {
            id: docSnap.id,
            ...docSnap.data()
        }
    }
}