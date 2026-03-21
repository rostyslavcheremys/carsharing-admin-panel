import { Tooltip, IconButton } from "@mui/material";

import {
    DirectionsCarIcon,
    DarkModeIcon,
    LightModeIcon,
} from "../../libs/mui-icons";

import { NavigateIconButton } from "../../components";

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
                    <Tooltip title={darkMode ? "Темна тема" : "Світла тема"} placement="right">
                        <IconButton onClick={toggleTheme}>
                            {darkMode ? (
                                <DarkModeIcon className="header__nav-icon" />
                            ) : (
                                <LightModeIcon className="header__nav-icon" />
                            )}
                        </IconButton>
                    </Tooltip>
                </nav>
            </div>
        </header>
    );
}