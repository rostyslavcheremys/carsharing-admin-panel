import { Outlet } from "react-router-dom";

import { Header, Footer } from "../components";

export const Layout = ({ darkMode, setDarkMode }) => {
    return (
        <div className="layout">
            <Header darkMode={darkMode} setDarkMode={setDarkMode}/>

            <main>
                <Outlet/>
            </main>

            <Footer/>
        </div>
    );
}