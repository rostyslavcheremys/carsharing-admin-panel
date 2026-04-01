import { Tooltip } from "../../libs/mui";

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

import { ActionIconButton, NavigateIconButton } from "../../components";

import { useAuth, useTheme } from "../../hooks";

import { ADMIN } from "../../constants";

export const AdminHeader = () => {
    const { darkMode, toggleTheme } = useTheme();

    const { logout } = useAuth();

    return(
        <header className="header header--admin">
            <div className="header__content header__content--admin">
                <NavigateIconButton
                    to={ADMIN.DASHBOARD}
                    Icon={DirectionsCarIcon}
                    className="header__logo"
                    iconClassName="header__logo-icon"
                />

                <nav className="header__nav header__nav--admin">
                    <Tooltip title="Моніторинг автомобілів" placement="right">
                        <NavigateIconButton
                            to={ADMIN.MONITORING}
                            Icon={NearMeIcon}
                            iconClassName="header__nav-icon"
                        />
                    </Tooltip>

                    <Tooltip title="Керування автомобілями" placement="right">
                        <NavigateIconButton
                            to={ADMIN.CARS}
                            Icon={DirectionsCarIcon}
                            iconClassName="header__nav-icon header__nav-icon--cars"
                        />
                    </Tooltip>

                    <Tooltip title="Керування користувачами" placement="right">
                        <NavigateIconButton
                            to={ADMIN.USERS}
                            Icon={PeopleIcon}
                            iconClassName="header__nav-icon header__nav-icon--users"
                        />
                    </Tooltip>

                    <Tooltip title="Керування бронюваннями" placement="right">
                        <NavigateIconButton
                            to={ADMIN.BOOKINGS}
                            Icon={EventNoteIcon}
                            iconClassName="header__nav-icon"
                        />
                    </Tooltip>

                    <Tooltip title="Керування поїздками" placement="right">
                        <NavigateIconButton
                            to={ADMIN.TRIPS}
                            Icon={RoomIcon}
                            iconClassName="header__nav-icon"
                        />
                    </Tooltip>

                    <Tooltip title={darkMode ? "Темна тема" : "Світла тема"} placement="right">
                        <ActionIconButton
                            Icon={darkMode ? DarkModeIcon : LightModeIcon}
                            onClick={toggleTheme}
                            iconClassName="header__nav-icon"
                        />
                    </Tooltip>

                    <Tooltip title="Вихід" placement="right">
                        <ActionIconButton
                            Icon={LogoutIcon}
                            onClick={logout}
                            iconClassName="header__nav-icon"
                        />
                    </Tooltip>
                </nav>
            </div>
        </header>
    );
}