import { Tooltip, IconButton } from "@mui/material";

import {
    DirectionsCarIcon,
    DarkModeIcon,
    LightModeIcon,
    LogoutIcon
} from "../../libs/mui-icons";

import {ActionIconButton, NavigateIconButton} from "../../components";

import { useAuth, useTheme } from "../../hooks";

import { HEADER__BUTTONS } from "../../constants";

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
                    {user &&
                        HEADER__BUTTONS.map(({ to, Icon, tooltip, iconClassName }) => (
                            <Tooltip key={to} title={tooltip} placement="right">
                                <NavigateIconButton
                                    to={to}
                                    Icon={Icon}
                                    iconClassName={iconClassName}
                                />
                            </Tooltip>
                        ))
                    }

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