import { Dialog } from "../../libs/mui";

export const AppDialog = ({ open, onClose, children, className = "dialog" }) => {
    return (
        <Dialog
            className={className}
            open={open}
            onClose={onClose}
            disableEnforceFocus
            disableRestoreFocus
            disablePortal={false}
        >
            {children}
        </Dialog>
    );
}