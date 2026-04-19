import { Route } from "react-router-dom";

import { UserLayout } from "../layouts";

import { ProtectedRoute } from "../guards";

import {
    HomePage,
    ProfilePage,
    ProfileEditPage,
    ProfileDetailsPage,
    MapPage,
    CarPage,
    CarAccessPage,
    CarConditionStartPage,
    CarConditionEndPage,
    BookingPeriodPage,
    BookingPaymentPage,
    BookingConfirmationPage,
    BookingsHistoryPage,
    BookingHistoryDetailsPage,
    TripPage,
    TripSummaryPage,
    TripsHistoryPage,
    TripHistoryDetailsPage,
} from "../pages";

import { USER } from "../constants";

export const UserRoutes = (
    <Route element={<UserLayout />}>
        <Route path={USER.HOME} element={
            <ProtectedRoute userOnly>
                <HomePage />
            </ProtectedRoute>
        }/>

        <Route path={USER.MAP} element={
            <ProtectedRoute userOnly>
                <MapPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.PROFILE} element={
            <ProtectedRoute userOnly>
                <ProfilePage />
            </ProtectedRoute>
        }/>

        <Route path={USER.PROFILE_DETAILS} element={
            <ProtectedRoute userOnly>
                <ProfileDetailsPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.PROFILE_EDIT} element={
            <ProtectedRoute userOnly>
                <ProfileEditPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.CAR_DETAILS}  element={
            <ProtectedRoute userOnly>
                <CarPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.BOOKING_PERIOD} element={
            <ProtectedRoute userOnly>
                <BookingPeriodPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.BOOKING_PAYMENT} element={
            <ProtectedRoute userOnly>
                <BookingPaymentPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.BOOKING_CONFIRM} element={
            <ProtectedRoute userOnly>
                <BookingConfirmationPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.BOOKINGS_HISTORY} element={
            <ProtectedRoute userOnly>
                <BookingsHistoryPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.BOOKINGS_HISTORY_DETAILS} element={
            <ProtectedRoute userOnly>
                <BookingHistoryDetailsPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.CAR_ACCESS} element={
            <ProtectedRoute userOnly>
                <CarAccessPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.CAR_CONDITIONS_START} element={
            <ProtectedRoute userOnly>
                <CarConditionStartPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.CAR_CONDITIONS_END} element={
            <ProtectedRoute userOnly>
                <CarConditionEndPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIP} element={
            <ProtectedRoute userOnly>
                <TripPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIP_SUMMARY} element={
            <ProtectedRoute userOnly>
                <TripSummaryPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIPS_HISTORY} element={
            <ProtectedRoute userOnly>
                <TripsHistoryPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIPS_HISTORY_DETAILS} element={
            <ProtectedRoute userOnly>
                <TripHistoryDetailsPage />
            </ProtectedRoute>
        }/>
    </Route>
);