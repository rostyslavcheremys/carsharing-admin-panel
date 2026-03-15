import { useNavigate } from "react-router-dom";

import { IconButton } from "../../libs/mui";

export const NavigateIconButton = ({ to, Icon, className, iconClassName }) => {
    const navigate = useNavigate();

    return (
        <IconButton
            onClick={(e) => {
                e.stopPropagation();
                navigate(to);
            }}
            className={className}
        >
            <Icon className={iconClassName} />
        </IconButton>
    );
}