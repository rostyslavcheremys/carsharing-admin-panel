import lightLogo from "../../assets/icons/diia-light.svg";
import darkLogo from "../../assets/icons/diia-dark.svg";

import { useTheme } from "../../hooks";

export const DiiaButton = ({ onClick, disabled = false }) => {
    const { darkMode } = useTheme();

    const diiaLogo = darkMode ? lightLogo : darkLogo;

    return (
        <div
            className={`diia-button ${disabled ? "diia-button--disabled" : ""}`}
            onClick={onClick}
        >
            <img src={diiaLogo} className="diia-button__image" alt="Дія" />
        </div>
    );
}