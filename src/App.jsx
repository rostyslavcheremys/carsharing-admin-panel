import { Routes, Route } from "react-router-dom";

import {
    Layout,
    Home,
    Cars,
    Login,
    Map,
    Users,
    CarCreate,
    CarEdit
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

                <Route path="/map" element={
                    <ProtectedRoute adminOnly>
                        <Map />
                    </ProtectedRoute>
                }/>

                <Route path="/cars" element={
                    <ProtectedRoute adminOnly>
                        <Cars />
                    </ProtectedRoute>
                }/>

                <Route path="/cars/add" element={
                    <ProtectedRoute adminOnly>
                        <CarCreate />
                    </ProtectedRoute>
                }/>

                <Route path="/cars/:id/edit" element={
                    <ProtectedRoute adminOnly>
                        <CarEdit />
                    </ProtectedRoute>
                }/>

                <Route path="/users" element={
                    <ProtectedRoute adminOnly>
                        <Users />
                    </ProtectedRoute>
                }/>
            </Route>
        </Routes>
    );
}