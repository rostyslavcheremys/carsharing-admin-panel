import { Outlet } from "react-router-dom";

import { Header } from "../components/index.js";

export const AdminLayout = () => {
    return (
        <div className="layout">
            <Header/>

            <div className="main__container">
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}