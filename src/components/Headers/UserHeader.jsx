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

import { USER } from "../../constants";

export const UserHeader = () => {
    const { darkMode, toggleTheme } = useTheme();

    const { logout } = useAuth();

    return(
        <header className="header header--user">
            <div className="header__content header__content--user">
                <NavigateIconButton
                    to={USER.HOME}
                    Icon={DirectionsCarIcon}
                    className="header__logo"
                    iconClassName="header__logo-icon"
                />

                <nav className="header__nav header__nav--user">
                    {/*<Tooltip title="Моніторинг автомобілів" placement="right">
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
                    </Tooltip>*/}

                    <ActionIconButton
                        Icon={darkMode ? DarkModeIcon : LightModeIcon}
                        onClick={toggleTheme}
                        iconClassName="header__nav-icon"
                    />

                    <ActionIconButton
                        Icon={LogoutIcon}
                        onClick={logout}
                        iconClassName="header__nav-icon"
                    />
                </nav>
            </div>
        </header>
    );
}