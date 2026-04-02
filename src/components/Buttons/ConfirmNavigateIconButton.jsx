import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavigateIconButton, ConfirmDialog } from "../../components";

export const ConfirmNavigateIconButton = ({
                                              to,
                                              Icon,
                                              tooltip,
                                              className,
                                              iconClassName,
                                              message = "Хочете перейти?",
                                          }) => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    const handleConfirm = () => {
        setOpen(false);
        navigate(to);
    }

    const handleCancel = () => setOpen(false);

    return (
        <>
            <NavigateIconButton
                to={to}
                Icon={Icon}
                tooltip={tooltip}
                className={className}
                iconClassName={iconClassName}
                onClick={handleClick}
            />

            <ConfirmDialog
                open={open}
                message={message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    );
}