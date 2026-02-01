import { Dialog } from "../../libs/mui";

import { AppButton } from "../../components";

export const ConfirmDialog = ({
                                  open,
                                  message,
                                  onConfirm,
                                  onCancel,
                              }) => {
    return (
        <Dialog
            className="dialog"
            open={open}
            onClose={onCancel}
            disableRestoreFocus={true}
        >
            <div className="dialog__content">
                <span className="dialog__message">{message}</span>
            </div>

            <div className="dialog__button">
                <AppButton
                    className="dialog__app-button"
                    label="Так"
                    onClick={onConfirm}
                />
                <AppButton
                    className="dialog__app-button"
                    label="Ні"
                    onClick={onCancel}
                />
            </div>
        </Dialog>
    );
}