import {
    DirectionsCarIcon,
    DarkModeIcon,
    LightModeIcon,
} from "../../libs/mui-icons";

import { ActionIconButton, NavigateIconButton } from "../../components";

import { useTheme } from "../../hooks";

export const AuthHeader = () => {
    const { darkMode, toggleTheme } = useTheme();

    return(
        <header className="header header--user">
            <div className="header__content header__content--user">
                <NavigateIconButton
                    Icon={DirectionsCarIcon}
                    className="header__logo"
                    iconClassName="header__logo-icon"
                />

                <nav className="header__nav header__nav--user">
                    <ActionIconButton
                        Icon={darkMode ? DarkModeIcon : LightModeIcon}
                        onClick={toggleTheme}
                        iconClassName="header__nav-icon"
                    />
                </nav>
            </div>
        </header>
    );
}