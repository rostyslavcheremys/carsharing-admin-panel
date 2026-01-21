import {
    Dialog,
    DialogContent,
    DialogActions
} from "../../libs/mui.js";

import { AppButton } from "../../components";

export const MessageDialog = ({ open, handleClose, message }) => {
    return (
        <Dialog className="message-dialog" open={open} onClose={handleClose}>
            <DialogContent className="message-dialog__content">
                <span className={`message-dialog__message`}>{message}</span>
            </DialogContent>
            <DialogActions className="message-dialog__actions">
                <AppButton label="OK" onClick={handleClose}/>
            </DialogActions>
        </Dialog>
    );
};