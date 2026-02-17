import { Routes, Route } from "react-router-dom";

import {
    Layout,
    Home,
    Cars,
    Login,
    Monitoring,
    Users,
    CarCreate,
    CarDetails,
    CarEdit,
    Bookings
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
                        <Home />
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
                            <Cars />
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

                <Route path="/users" element={
                    <ProtectedRoute adminOnly>
                        <Users />
                    </ProtectedRoute>
                }/>

                <Route path="/bookings" element={
                    <ProtectedRoute adminOnly>
                        <Bookings />
                    </ProtectedRoute>
                }/>
            </Route>
        </Routes>
    );
}