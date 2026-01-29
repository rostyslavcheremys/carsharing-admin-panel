import { useNavigate } from "react-router-dom";

import {
    MapIcon,
    DirectionsCarIcon,
    PeopleIcon,
    LightModeIcon,
    DarkModeIcon,
    LogoutIcon,
} from "../../libs/mui-icons";

import {
    useAuth,
    useTheme
} from "../../hooks";
import {IconButton} from "@mui/material";

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
                            <IconButton onClick={() => navigate("/map")}>
                                <MapIcon className="header__nav-icon header__nav-icon--map"/>
                            </IconButton>

                            <IconButton onClick={() => navigate("/cars")}>
                                <DirectionsCarIcon className="header__nav-icon header__nav-icon--cars"/>
                            </IconButton>

                            <IconButton onClick={() => navigate("/users")}>
                                <PeopleIcon className="header__nav-icon header__nav-icon--users"/>
                            </IconButton>
                        </>
                    )}

                    {darkMode ? (
                        <IconButton onClick={toggleTheme}>
                            <DarkModeIcon className="header__nav-icon header__nav-icon--dark"/>
                        </IconButton>
                    ) : (
                        <IconButton onClick={toggleTheme}>
                            <LightModeIcon className="header__nav-icon header__nav-icon--light"/>
                        </IconButton>
                    )}

                    {user && (
                        <IconButton  onClick={logout}>
                            <LogoutIcon className="header__nav-icon header__nav-icon--logout"/>
                        </IconButton>
                    )}
                </nav>
            </div>
        </header>
    );
}