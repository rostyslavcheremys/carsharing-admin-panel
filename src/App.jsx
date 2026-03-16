import { Routes, Route } from "react-router-dom";

import {
    Layout,
    Dashboard,
    Login,
    Monitoring,
    UsersManagement,
    UserDetails,
    CarsManagement,
    CarDetails,
    CarCreate,
    CarEdit,
    BookingsManagement,
    BookingDetails,
    TripsManagement,
    TripsDetails,
    CarStateDetails,
} from "./pages";

import { ProtectedRoute, PublicRoute } from "./routes";

export const App = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }/>

                <Route path="/" element={
                    <ProtectedRoute adminOnly>
                        <Dashboard />
                    </ProtectedRoute>
                }/>

                <Route path="/monitoring" element={
                    <ProtectedRoute adminOnly>
                        <Monitoring />
                    </ProtectedRoute>
                }/>

                <Route path="cars">
                    <Route index element={
                        <ProtectedRoute adminOnly>
                            <CarsManagement />
                        </ProtectedRoute>
                    }/>

                    <Route path="add" element={
                        <ProtectedRoute adminOnly>
                            <CarCreate />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <CarDetails />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id/edit" element={
                        <ProtectedRoute adminOnly>
                            <CarEdit />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="users">
                    <Route index element={
                        <ProtectedRoute adminOnly>
                            <UsersManagement />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <UserDetails />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="bookings">
                    <Route index element={
                        <ProtectedRoute adminOnly>
                            <BookingsManagement />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <BookingDetails />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="trips">
                    <Route index element={
                        <ProtectedRoute adminOnly>
                            <TripsManagement />
                        </ProtectedRoute>
                    }/>

                    <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <TripsDetails />
                        </ProtectedRoute>
                    }/>
                </Route>

                <Route path="car-state">
                     <Route path=":id" element={
                        <ProtectedRoute adminOnly>
                            <CarStateDetails />
                        </ProtectedRoute>
                    }/>
                </Route>
            </Route>
        </Routes>
    );
}