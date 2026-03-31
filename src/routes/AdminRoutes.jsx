import { Route } from "react-router-dom";

import { AdminLayout } from "../layouts";

import { ProtectedRoute } from "../guards";

import {
    DashboardPage,
    MonitoringPage,
    CarsManagementPage,
    CarDetailsPage,
    CarCreatePage,
    CarEditPage,
    CarConditionDetailsPage,
    UsersManagementPage,
    UserDetailsPage,
    BookingsManagementPage,
    BookingDetailsPage,
    TripsManagementPage,
    TripsDetailsPage,
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
                <CarsManagementPage />
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
                <UsersManagementPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.USER_DETAILS} element={
            <ProtectedRoute adminOnly>
                <UserDetailsPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.BOOKINGS}  element={
            <ProtectedRoute adminOnly>
                <BookingsManagementPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.BOOKING_DETAILS} element={
            <ProtectedRoute adminOnly>
                <BookingDetailsPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.TRIPS} element={
            <ProtectedRoute adminOnly>
                <TripsManagementPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.TRIP_DETAILS} element={
            <ProtectedRoute adminOnly>
                <TripsDetailsPage />
            </ProtectedRoute>
        }/>

        <Route path={ADMIN.CAR_CONDITION_DETAILS} element={
            <ProtectedRoute adminOnly>
                <CarConditionDetailsPage />
            </ProtectedRoute>
        }/>
    </Route>
);