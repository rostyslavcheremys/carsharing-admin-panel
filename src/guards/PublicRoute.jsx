import { Navigate } from "react-router-dom";

import { Loader } from "../components";

import { useAuth } from "../hooks";

import { ADMIN, USER } from "../constants";

export const PublicRoute = ({ children, redirectTo }) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader isLoading />;

    if (!user) return children;

    const roleRedirect = redirectTo ?? (user.role === "admin" ? ADMIN.DASHBOARD : USER.HOME);

    return <Navigate to={roleRedirect} replace />;
}