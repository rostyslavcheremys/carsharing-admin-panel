import { Link } from "react-router-dom";

import { Tooltip, IconButton } from "../../libs/mui";

export const NavigateIconButton = ({
                                       to,
                                       Icon,
                                       tooltip,
                                       className,
                                       iconClassName,
                                       onClick,
                                       ...props
                                   }) => {
    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault();
            onClick(e);
        }
    }

    return (
        <Tooltip title={tooltip} placement="right">
            <IconButton
                component={Link}
                to={to}
                className={className}
                onClick={handleClick}
                {...props}
            >
                <Icon className={iconClassName} />
            </IconButton>
        </Tooltip>
    );
};