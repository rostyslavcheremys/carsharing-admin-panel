import { IconButton } from "../../libs/mui";

import { LockIcon, LockOpenIcon } from "../../libs/mui-icons";

export const CarAccessButton = ({
                                    isLocked,
                                    onClick,
                                    disabled,
                                    loading,
                                }) => {
    const Icon = isLocked ? LockIcon : LockOpenIcon;

    return (
        <IconButton
            className={`car-access-button ${isLocked ? "" : "car-access-button--unlock"}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            <Icon className="car-access-button__icon" />
        </IconButton>
    );
};