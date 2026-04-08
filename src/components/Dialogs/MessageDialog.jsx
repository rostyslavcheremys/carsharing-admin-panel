import { AppDialog, AppButton } from "../../components";

export const MessageDialog = ({ open, onClose, message }) => {
    return (
        <AppDialog open={open} onClose={onClose}>
            <div className="dialog__content">
                <span className="dialog__message">{message}</span>
            </div>

            <div className="dialog__button">
                <AppButton
                    className="app-button--small"
                    label="OK"
                    onClick={onClose}
                />
            </div>
        </AppDialog>
    );
}