import { IconButton } from "../../libs/mui";

import { LockIcon, LockOpenIcon } from "../../libs/mui-icons";

export const CarAccessButton = ({
                                    isLocked,
                                    onClick,
                                    disabled,
                                    loading,
                                }) => {
    const Icon = isLocked ? LockOpenIcon : LockIcon;

    return (
        <IconButton
            className={`car-access-button ${isLocked ? "car-access-button--open" : ""}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            <Icon className="car-access-button__icon" />
        </IconButton>
    );
};