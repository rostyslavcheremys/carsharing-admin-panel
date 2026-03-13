import { IconButton } from "../../libs/mui";

export const ActionIconButton = ({ Icon, onClick, className, iconClassName, ...props }) => {
    return (
        <IconButton onClick={onClick} className={className} {...props}>
            <Icon className={iconClassName} />
        </IconButton>
    );
}