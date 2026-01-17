/*import { useNavigate } from "react-router-dom";*/

import {
    PersonIcon,
    MapIcon,
    DirectionsCarIcon,
    PeopleIcon,
    LogoutIcon,
} from "../../libs/mui-icons.js";

export const Header = () => {
    /*const navigate = useNavigate();*/

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
                    <LogoutIcon
                        className="header__nav-icon header__nav-icon--logout"
                    />
                </nav>
            </div>
        </header>
    );
}