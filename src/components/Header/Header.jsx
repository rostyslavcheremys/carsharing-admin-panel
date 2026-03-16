import { Tooltip, IconButton } from "@mui/material";

import {
    NearMeIcon,
    DirectionsCarIcon,
    PeopleIcon,
    EventNoteIcon,
    RoomIcon,
    DarkModeIcon,
    LightModeIcon,
    LogoutIcon
} from "../../libs/mui-icons";

import {ActionIconButton, NavigateIconButton} from "../../components";

import { useAuth, useTheme } from "../../hooks";

export const Header = () => {
    const { darkMode, toggleTheme } = useTheme();

    const { user, logout } = useAuth();

    return(
        <header className="header">
            <div className="header__content">
                <NavigateIconButton
                    to="/"
                    Icon={DirectionsCarIcon}
                    className="header__logo"
                    iconClassName="header__logo-icon"
                />

                <nav className="header__nav">
                    {user && (
                        <>
                            <Tooltip title="Моніторинг автомобілів" placement="right">
                                <NavigateIconButton
                                    to="/monitoring"
                                    Icon={NearMeIcon}
                                    iconClassName="header__nav-icon"
                                />
                            </Tooltip>

                            <Tooltip title="Керування автомобілями" placement="right">
                                <NavigateIconButton
                                    to="/cars"
                                    Icon={DirectionsCarIcon}
                                    iconClassName="header__nav-icon header__nav-icon--cars"
                                />
                            </Tooltip>

                            <Tooltip title="Керування користувачами" placement="right">
                                <NavigateIconButton
                                    to="/users"
                                    Icon={PeopleIcon}
                                    iconClassName="header__nav-icon header__nav-icon--users"
                                />
                            </Tooltip>

                            <Tooltip title="Керування бронюваннями" placement="right">
                                <NavigateIconButton
                                    to="/bookings"
                                    Icon={EventNoteIcon}
                                    iconClassName="header__nav-icon"
                                />
                            </Tooltip>

                            <Tooltip title="Керування поїздками" placement="right">
                                <NavigateIconButton
                                    to="/trips"
                                    Icon={RoomIcon}
                                    iconClassName="header__nav-icon"
                                />
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
                            <ActionIconButton
                                Icon={LogoutIcon}
                                onClick={logout}
                                iconClassName="header__nav-icon"
                            />
                        </Tooltip>
                    )}
                </nav>
            </div>
        </header>
    );
}