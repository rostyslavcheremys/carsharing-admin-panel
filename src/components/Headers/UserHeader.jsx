import {
    DirectionsCarIcon,
    PersonIcon,
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
                    <NavigateIconButton
                        to={USER.PROFILE}
                        Icon={PersonIcon}
                        iconClassName="header__nav-icon header__nav-icon--large"
                    />

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