import { Outlet } from "react-router-dom";

import { Header } from "../components";

export const Layout = () => {
    return (
        <div className="layout">
            <Header/>
            <main>
                <Outlet/>
            </main>
            {/*<Footer/>*/}
        </div>
    );
}