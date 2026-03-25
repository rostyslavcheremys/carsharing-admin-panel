import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "../components";
import { useAuth } from "../hooks";

export const ProtectedRoute = ({ children, adminOnly = false, userOnly = false }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loader isLoading />;

    if (!user) return <Navigate to="/auth/login" replace />;

    if (user.role === "user" && user.verificationStatus !== "approved") {
        if (location.pathname !== "/auth/driver-verification") {
            return <Navigate to="/auth/driver-verification" replace />;
        }
    }

    if (location.pathname === "/auth/driver-verification" && user.verificationStatus === "approved") {
        return <Navigate to="/" replace />;
    }

    if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;
    if (userOnly && user.role !== "user") return <Navigate to="/dashboard" replace />;

    return children;
}