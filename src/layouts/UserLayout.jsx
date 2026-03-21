import { Outlet } from "react-router-dom";

import { UserHeader } from "../components";

import "./Layouts.css";

export const UserLayout = () => {
    return (
        <div className="layout layout--user">
            <UserHeader/>

            <div className="layout__container">
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}