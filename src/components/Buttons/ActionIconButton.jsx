import { Tooltip, IconButton } from "../../libs/mui";

export const ActionIconButton = ({
                                     className,
                                     title,
                                     placement,
                                     Icon,
                                     onClick,
                                     iconClassName,
                                     ...props
}) => {
    return (
        <Tooltip
            title={title}
            placement={placement}
            slotProps={{
                popper: {
                    container: document.fullscreenElement || document.body
                },
            }}
        >
            <IconButton onClick={onClick} className={className} {...props}>
                <Icon className={iconClassName} />
            </IconButton>
        </Tooltip>
    );
}