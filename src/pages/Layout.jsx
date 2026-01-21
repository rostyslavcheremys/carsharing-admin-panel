import { Outlet } from "react-router-dom";

import { Header, Footer } from "../components";

export const Layout = () => {
    return (
        <div className="layout">
            <Header/>

            <main>
                <Outlet/>
            </main>

            <Footer/>
        </div>
    );
}