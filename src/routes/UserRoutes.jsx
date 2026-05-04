import { Route } from "react-router-dom";

import { UserLayout } from "../layouts";

import { ProtectedRoute } from "../guards";

import {
    HomePage,
    MapPage,
    ProfilePage,
    ProfileEditPage,
    ProfileDetailsPage,
    BookingPeriodPage,
    BookingPaymentPage,
    BookingConfirmationPage,
    BookingHistoryPage,
    BookingHistoryDetailsPage,
    TripStartPage,
    CarAccessPage,
    CarConditionPage,
    TripActivePage,
    TripPaymentPage,
    TripSummaryPage,
    TripHistoryPage,
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

        <Route path={USER.BOOKING_HISTORY} element={
            <ProtectedRoute userOnly>
                <BookingHistoryPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.BOOKING_HISTORY_DETAILS} element={
            <ProtectedRoute userOnly>
                <BookingHistoryDetailsPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIP_START} element={
            <ProtectedRoute userOnly>
                <TripStartPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIP_ACTIVE} element={
            <ProtectedRoute userOnly>
                <TripActivePage />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIP_ACCESS} element={
            <ProtectedRoute userOnly>
                <CarAccessPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIP_CONDITION_START} element={
            <ProtectedRoute userOnly>
                <CarConditionPage type="start" />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIP_CONDITION_END} element={
            <ProtectedRoute userOnly>
                <CarConditionPage type="end" />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIP_PAYMENT} element={
            <ProtectedRoute userOnly>
                <TripPaymentPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIP_SUMMARY} element={
            <ProtectedRoute userOnly>
                <TripSummaryPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIP_HISTORY} element={
            <ProtectedRoute userOnly>
                <TripHistoryPage />
            </ProtectedRoute>
        }/>

        <Route path={USER.TRIP_HISTORY_DETAILS} element={
            <ProtectedRoute userOnly>
                <TripHistoryDetailsPage />
            </ProtectedRoute>
        }/>
    </Route>
);