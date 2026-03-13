import { Routes, Route } from "react-router-dom";

import {
    Layout,
    Dashboard,
    CarsManagement,
    Login,
    Monitoring,
    UsersManagement,
    UserDetails,
    CarCreate,
    CarDetails,
    CarEdit,
    BookingsManagement,
    BookingDetails
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
            </Route>
        </Routes>
    );
}