import { Navigate } from "react-router-dom";

import { Loader } from "../components";
import { useAuth } from "../hooks";

export const PublicRoute = ({ children, redirectTo }) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader isLoading />;

    if (user) {
        if (redirectTo) {
            return <Navigate to={redirectTo} replace />;
        }

        const roleRedirect = user.role === "admin" ? "/dashboard" : "/";
        return <Navigate to={roleRedirect} replace />;
    }

    return children;
}