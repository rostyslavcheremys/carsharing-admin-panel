import { Dialog } from "../../libs/mui.js";

import { AppButton } from "../../components";

export const MessageDialog = ({ open, handleClose, message }) => {
    return (
        <Dialog className="dialog" open={open} onClose={handleClose}>
            <div className="dialog__content">
                <span className="dialog__message">{message}</span>
            </div>
            <div className="dialog__button">
                <AppButton label="OK" onClick={handleClose}/>
            </div>
        </Dialog>
    );
}