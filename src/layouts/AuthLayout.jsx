import { Outlet } from "react-router-dom";

import { Header } from "../components";

export const AuthLayout = () => {
    return (
        <div className="layout layout--auth">
            <div className="layout__container">
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}