import { useNavigate } from "react-router-dom";

import { Tooltip, IconButton } from "@mui/material";

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
                <IconButton className="header__logo" onClick={() => navigate("/")}>
                    <DirectionsCarIcon className="header__logo-icon"/>
                </IconButton>

                <nav className="header__nav">

                    {user && (
                        <>
                            <Tooltip title="Моніторинг автомобілів" placement="right">
                                <IconButton onClick={() => navigate("/monitoring")}>
                                    <NearMeIcon className="header__nav-icon"/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Керування автомобілями" placement="right">
                                <IconButton onClick={() => navigate("/cars")}>
                                    <DirectionsCarIcon className="header__nav-icon header__nav-icon--cars"/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Керування користувачами" placement="right">
                                <IconButton onClick={() => navigate("/users")}>
                                    <PeopleIcon className="header__nav-icon header__nav-icon--users"/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Перегляд бронювань" placement="right">
                                <IconButton onClick={() => navigate("/bookings")}>
                                    <DescriptionIcon className="header__nav-icon"/>
                                </IconButton>
                            </Tooltip>
                        </>
                    )}

                    <Tooltip title={darkMode ? "Темна тема" : "Світла тема"} placement="right">
                        <IconButton onClick={toggleTheme}>
                            {darkMode ? (
                                <DarkModeIcon className="header__nav-icon" />
                            ) : (
                                <LightModeIcon className="header__nav-icon" />
                            )}
                        </IconButton>
                    </Tooltip>

                    {user && (
                        <Tooltip title="Вихід" placement="right">
                            <IconButton  onClick={logout}>
                                <LogoutIcon className="header__nav-icon"/>
                            </IconButton>
                        </Tooltip>
                    )}
                </nav>
            </div>
        </header>
    );
}