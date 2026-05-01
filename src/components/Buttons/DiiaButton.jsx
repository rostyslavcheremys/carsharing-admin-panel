import { diiaDark, diiaLight } from "../../assets/icons";

import { useTheme } from "../../hooks";

export const DiiaButton = ({ onClick, disabled = false }) => {
    const { darkMode } = useTheme();

    const diiaLogo = darkMode ? diiaLight : diiaDark;

    return (
        <div
            className={`diia-button ${disabled ? "diia-button--disabled" : ""}`}
            onClick={onClick}
        >
            <img src={diiaLogo} className="diia-button__image" alt="Дія" />
        </div>
    );
}