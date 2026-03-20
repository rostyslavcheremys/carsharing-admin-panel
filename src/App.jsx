import { Routes, Route } from "react-router-dom";

import {
    AdminLayout,
    AuthLayout,
} from "./layouts";

import {
    DashboardPage,
    LoginPage,
    MonitoringPage,
    UsersManagementPage,
    UserDetailsPage,
    CarsManagementPage,
    CarDetailsPage,
    CarCreatePage,
    CarEditPage,
    BookingsManagementPage,
    BookingDetailsPage,
    TripsManagementPage,
    TripsDetailsPage,
    CarStateDetailsPage,
} from "./pages";

import { ProtectedRoute, PublicRoute } from "./routes";

export const App = () => {
    return (
        <Routes>

            <Route element={<AuthLayout />}>
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }/>
            </Route>

            <Route element={<AdminLayout />}>
                <Route path="/" element={
                    <ProtectedRoute adminOnly>
                        <DashboardPage />
                    </ProtectedRoute>
                }/>

                <Route path="/monitoring" element={
                    <ProtectedRoute adminOnly>
                        <MonitoringPage />
                    </ProtectedRoute>
                }/>

                <Route path="cars">
                    <Route index element={
                        <ProtectedRoute adminOnly>
                            <CarsManagementPage />
                        </ProtectedRoute>
                    }/>

                    <Route path="add" element={
                        <ProtectedRoute adminOnly>
                            <CarCreatePage />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <CarDetailsPage />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id/edit" element={
                        <ProtectedRoute adminOnly>
                            <CarEditPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="users">
                    <Route index element={
                        <ProtectedRoute adminOnly>
                            <UsersManagementPage />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <UserDetailsPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="bookings">
                    <Route index element={
                        <ProtectedRoute adminOnly>
                            <BookingsManagementPage />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <BookingDetailsPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="trips">
                    <Route index element={
                        <ProtectedRoute adminOnly>
                            <TripsManagementPage />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <TripsDetailsPage />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="car-state">
                     <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <CarStateDetailsPage />
                        </ProtectedRoute>
                    }/>
                </Route>
            </Route>
        </Routes>
    );
}