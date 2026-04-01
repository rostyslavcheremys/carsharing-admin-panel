import { Link } from "react-router-dom";

import { Tooltip, IconButton } from "../../libs/mui";

export const NavigateIconButton = ({
                                       to,
                                       Icon,
                                       tooltip,
                                       className,
                                       iconClassName,
                                       ...props
                                   }) => {
    return (
        <Tooltip title={tooltip} placement="right">
            <IconButton
                component={Link}
                to={to}
                className={className}
                {...props}
            >
                <Icon className={iconClassName} />
            </IconButton>
        </Tooltip>
    );
};