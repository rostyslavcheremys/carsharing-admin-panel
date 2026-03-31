import { Routes } from "react-router-dom";

import {
    AuthRoutes,
    UserRoutes,
    AdminRoutes
} from "./";

export const AppRoutes = () => {
    return (
        <Routes>
            {AuthRoutes}
            {UserRoutes}
            {AdminRoutes}
        </Routes>
    );
}