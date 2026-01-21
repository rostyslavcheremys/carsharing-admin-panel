import { Navigate } from "react-router-dom";

import { Loader } from "../components";

import { useAuth } from "../hooks";

export const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    return (
        <Loader isLoading={loading}>
            {user ? <Navigate to="/" replace /> : children}
        </Loader>
    );
};