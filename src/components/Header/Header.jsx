/*import { useNavigate } from "react-router-dom";*/

import {
    MapIcon,
    DirectionsCarIcon,
    PeopleIcon,
    LightModeIcon,
    DarkModeIcon,
    LogoutIcon,
} from "../../libs/mui-icons.js";

export const Header = ({ darkMode, setDarkMode }) => {
    /*const navigate = useNavigate();*/

    const handleToggleTheme = () => {
        setDarkMode(prev => !prev);
    };

    return(
        <header className="header">
            <div className="header__content">
                <span className="header__logo">Carsharing</span>

                <nav className="header__nav">
                    <MapIcon
                        className="header__nav-icon header__nav-icon--map"
                    />
                    <DirectionsCarIcon
                        className="header__nav-icon header__nav-icon--cars"
                    />
                    <PeopleIcon
                        className="header__nav-icon header__nav-icon--users"
                    />

                    {darkMode ? (
                        <DarkModeIcon
                            className="header__nav-icon header__nav-icon--dark"
                            onClick={handleToggleTheme}
                        />
                    ) : (
                        <LightModeIcon
                            className="header__nav-icon header__nav-icon--light"
                            onClick={handleToggleTheme}
                        />
                    )}

                    <LogoutIcon
                        className="header__nav-icon header__nav-icon--logout"
                    />
                </nav>
            </div>
        </header>
    );
}