import { useNavigate } from "react-router-dom";

import {
    MapIcon,
    DirectionsCarIcon,
    PeopleIcon,
    LightModeIcon,
    DarkModeIcon,
    LogoutIcon,
} from "../../libs/mui-icons.js";

import {
    useAuth,
    useTheme
} from "../../hooks";

export const Header = () => {
    const navigate = useNavigate();

    const { darkMode, toggleTheme } = useTheme();

    const { user, logout } = useAuth();

    return(
        <header className="header">
            <div className="header__content">
                <span className="header__logo">Carsharing</span>

                <nav className="header__nav">

                    {user && (
                        <>
                            <MapIcon
                                className="header__nav-icon header__nav-icon--map"
                                onClick={() => navigate("/map")}
                            />
                            <DirectionsCarIcon
                                className="header__nav-icon header__nav-icon--cars"
                                onClick={() => navigate("/cars")}
                            />
                            <PeopleIcon
                                className="header__nav-icon header__nav-icon--users"
                                onClick={() => navigate("/users")}
                            />
                        </>
                    )}

                    {darkMode ? (
                        <DarkModeIcon
                            className="header__nav-icon header__nav-icon--dark"
                            onClick={toggleTheme}
                        />
                    ) : (
                        <LightModeIcon
                            className="header__nav-icon header__nav-icon--light"
                            onClick={toggleTheme}
                        />
                    )}

                    {user && (
                        <>
                            <LogoutIcon
                                className="header__nav-icon header__nav-icon--logout"
                                onClick={logout}
                            />
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}