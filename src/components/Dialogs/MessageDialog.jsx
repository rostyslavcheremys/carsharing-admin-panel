import { Dialog } from "../../libs/mui";

import { AppButton } from "../../components";

export const MessageDialog = ({ open, onClose, message }) => {
    return (
        <Dialog className="dialog" open={open} onClose={onClose}>
            <div className="dialog__content">
                <span className="dialog__message">{message}</span>
            </div>
            <div className="dialog__button">
                <AppButton className="dialog__app-button" label="OK" onClick={onClose}/>
            </div>
        </Dialog>
    );
}