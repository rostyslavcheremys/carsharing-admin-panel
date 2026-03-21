import { Navigate } from "react-router-dom";

import { Loader } from "../components";

import { useAuth } from "../hooks";

export const ProtectedRoute = ({
                                   children,
                                   adminOnly = false,
                                   userOnly = false
                                }) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader isLoading />;

    if (!user) return <Navigate to="/auth/login" replace />;

    if (adminOnly && user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    if (userOnly) {
        if (user.role !== "user") {
            return <Navigate to="/dashboard" replace />;
        }

        if (user.verificationStatus !== "approved") {
            return <Navigate to="/auth/driver-verification" replace />;
        }
    }

    return children;
}