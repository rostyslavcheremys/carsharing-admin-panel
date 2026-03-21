import { Outlet } from "react-router-dom";

import { AuthHeader } from "../components";

import "./Layouts.css";

export const AuthLayout = () => {
    return (
        <div className="layout layout--auth">
            <AuthHeader/>

            <div className="layout__container">
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}