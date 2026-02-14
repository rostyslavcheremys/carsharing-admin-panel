import { useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";

import {
    NearMeIcon,
    DirectionsCarIcon,
    PeopleIcon,
    LightModeIcon,
    DarkModeIcon,
    LogoutIcon,
    DescriptionIcon
} from "../../libs/mui-icons";

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
                            <IconButton onClick={() => navigate("/monitoring")}>
                                <NearMeIcon className="header__nav-icon"/>
                            </IconButton>

                            <IconButton onClick={() => navigate("/cars")}>
                                <DirectionsCarIcon className="header__nav-icon header__nav-icon--cars"/>
                            </IconButton>

                            <IconButton onClick={() => navigate("/users")}>
                                <PeopleIcon className="header__nav-icon header__nav-icon--users"/>
                            </IconButton>

                            <IconButton onClick={() => navigate("/bookings")}>
                                <DescriptionIcon className="header__nav-icon"/>
                            </IconButton>
                        </>
                    )}

                    {darkMode ? (
                        <IconButton onClick={toggleTheme}>
                            <DarkModeIcon className="header__nav-icon"/>
                        </IconButton>
                    ) : (
                        <IconButton onClick={toggleTheme}>
                            <LightModeIcon className="header__nav-icon"/>
                        </IconButton>
                    )}

                    {user && (
                        <IconButton  onClick={logout}>
                            <LogoutIcon className="header__nav-icon"/>
                        </IconButton>
                    )}
                </nav>
            </div>
        </header>
    );
}