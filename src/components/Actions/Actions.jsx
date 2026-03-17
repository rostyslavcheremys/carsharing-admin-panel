import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LockOpenIcon, LockIcon } from "../../libs/mui-icons";

import { ActionIconButton, ConfirmDialog } from "../../components";

import { getActionMessage } from "../../utils";

export const Actions = ({ id, actions, entity, currentState }) => {
    const navigate = useNavigate();
    const [action, setAction] = useState(null);
    const [loading, setLoading] = useState(false);

    const openDialog = (type) => (e) => {
        e.stopPropagation();
        if (!loading) setAction(type);
    };

    const closeDialog = () => setAction(null);

    const handleConfirm = async () => {
        const actionConfig = actions.find((a) => a.type === action);
        if (!actionConfig) return;

        closeDialog();
        setLoading(true);

        try {
            await actionConfig.handler({
                id,
                isBlocked: currentState?.isBlocked,
                navigate,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {actions.map(({ type, Icon }) => {
                let DynamicIcon = Icon;

                if (type === "toggleBlock" && currentState) {
                    DynamicIcon = currentState.isBlocked ? LockIcon : LockOpenIcon;
                }

                return (
                    <ActionIconButton
                        key={type}
                        Icon={DynamicIcon}
                        onClick={openDialog(type)}
                        iconClassName="icon-button"
                        disabled={loading}
                    />
                );
            })}

            {action && (
                <ConfirmDialog
                    open={Boolean(action)}
                    message={getActionMessage(entity, action, id, currentState?.isBlocked)}
                    onCancel={closeDialog}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    );
}