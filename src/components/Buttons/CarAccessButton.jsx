import { IconButton } from "../../libs/mui";

import { LockIcon, LockOpenIcon } from "../../libs/mui-icons";

export const CarAccessButton = ({
                                    isOpen,
                                    onClick,
                                    disabled,
                                    loading,
                                }) => {
    const Icon = isOpen ? LockOpenIcon : LockIcon;

    return (
        <IconButton
            className={`car-access-button ${isOpen ? "car-access-button--open" : ""}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            <Icon className="car-access-button__icon" />
        </IconButton>
    );
};