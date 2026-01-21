import { Navigate } from "react-router-dom";

import { Loader } from "../components";

import { useAuth } from "../hooks";

export const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();

    return (
        <Loader isLoading={loading}>
            {!user && <Navigate to="/login" replace />}

            {adminOnly && user?.role !== "admin" && (
                <Navigate to="/login" replace />
            )}

            {user && children}
        </Loader>
    );
};