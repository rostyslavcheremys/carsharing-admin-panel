import { Route } from "react-router-dom";

import { AdminLayout } from "../layouts";

import { ProtectedRoute } from "../guards";

import {
    DashboardPage,
    MonitoringPage,
    CarsManagePage,
    CarDetailsPage,
    CarCreatePage,
    CarEditPage,
    CarConditionDetailsPage,
    UsersManagePage,
    UserDetailsPage,
    BookingsManagePage,
    BookingDetailsPage,
    TripsManagePage,
    TripDetailsPage,
} from "../pages";

import { ADMIN } from "../constants";

export const AdminRoutes = (
    <Route element={<AdminLayout />}>
        <Route path={ADMIN.DASHBOARD} element={
            <ProtectedRoute adminOnly>
                <DashboardPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.MONITORING} element={
            <ProtectedRoute adminOnly>
                <MonitoringPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.CARS} element={
            <ProtectedRoute adminOnly>
                <CarsManagePage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.CAR_CREATE} element={
            <ProtectedRoute adminOnly>
                <CarCreatePage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.CAR_DETAILS} element={
            <ProtectedRoute adminOnly>
                <CarDetailsPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.CAR_EDIT} element={
            <ProtectedRoute adminOnly>
                <CarEditPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.USERS} element={
            <ProtectedRoute adminOnly>
                <UsersManagePage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.USER_DETAILS} element={
            <ProtectedRoute adminOnly>
                <UserDetailsPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.BOOKINGS}  element={
            <ProtectedRoute adminOnly>
                <BookingsManagePage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.BOOKING_DETAILS} element={
            <ProtectedRoute adminOnly>
                <BookingDetailsPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.TRIPS} element={
            <ProtectedRoute adminOnly>
                <TripsManagePage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.TRIP_DETAILS} element={
            <ProtectedRoute adminOnly>
                <TripDetailsPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.CAR_CONDITION_DETAILS} element={
            <ProtectedRoute adminOnly>
                <CarConditionDetailsPage />
            </ProtectedRoute>
        }/>
    </Route>
);