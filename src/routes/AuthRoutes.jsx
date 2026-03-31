import { Route } from "react-router-dom";

import { AuthLayout } from "../layouts";

import { ProtectedRoute, PublicRoute } from "../guards";

import {
    LoginPage,
    RegisterPage,
    DriverVerificationPage
} from "../pages";

import { AUTH } from "../constants";

export const AuthRoutes = (
    <Route element={<AuthLayout />}>
        <Route path={AUTH.LOGIN} element={
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        }/>

        <Route path={AUTH.REGISTER} element={
            <PublicRoute redirectTo={AUTH.DRIVER_VERIFICATION}>
                <RegisterPage />
            </PublicRoute>
        }/>

        <Route path={AUTH.DRIVER_VERIFICATION} element={
            <ProtectedRoute>
                <DriverVerificationPage />
            </ProtectedRoute>
        }/>
    </Route>
);