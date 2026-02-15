import { Outlet } from "react-router-dom";

import { Header } from "../components";

export const Layout = () => {
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