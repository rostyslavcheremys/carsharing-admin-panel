import { Routes, Route } from "react-router-dom";

import {
    Layout,
    Home,
    Cars,
    Login,
    Map,
    Users,
    CarForm,
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

                <Route path="/car" element={
                    <ProtectedRoute adminOnly>
                        <CarForm />
                    </ProtectedRoute>
                }/>

                <Route path="/users" element={
                    <ProtectedRoute adminOnly>
                        <Users />
                    </ProtectedRoute>
                }/>

                {/* <Route path="/menu" element={<Menu />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/order/:id" element={<OrderDetails />} />
                        <Route path="/edit" element={<Edit />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/auth/callback" element={<AuthCallback />} />*/}
            </Route>
        </Routes>
    );
}