import { AppDialog, AppButton } from "../../components";

export const ConfirmDialog = ({
                                  open,
                                  message,
                                  onConfirm,
                                  onCancel,
                              }) => {
    return (
        <AppDialog open={open} onClose={onCancel}>
            <div className="dialog__content">
                <span className="dialog__message">{message}</span>
            </div>

            <div className="dialog__button">
                <AppButton
                    className="app-button--size-sm"
                    label="Так"
                    onClick={onConfirm}
                />

                <AppButton
                    className="app-button--size-sm"
                    label="Ні"
                    onClick={onCancel}
                />
            </div>
        </AppDialog>
    );
}