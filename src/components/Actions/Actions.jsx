import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IconButton } from "../../libs/mui";
import { ConfirmDialog } from "../../components";

export const Actions = ({ id, actions, getMessage }) => {
    const navigate = useNavigate();
    const [action, setAction] = useState(null);

    const openDialog = (type) => (e) => {
        e.stopPropagation();
        setAction(type);
    };

    const closeDialog = () => setAction(null);

    const handleConfirm = () => {
        const actionConfig = actions.find((a) => a.type === action);

        if (actionConfig?.handler) {
            actionConfig.handler({ id, navigate });
        }

        closeDialog();
    };

    return (
        <div className="actions">
            {actions.map(({ type, Icon }) => (
                <IconButton key={type} onClick={openDialog(type)}>
                    <Icon className="actions__icon" />
                </IconButton>
            ))}

            <ConfirmDialog
                open={Boolean(action)}
                message={getMessage(action, id)}
                onCancel={closeDialog}
                onConfirm={handleConfirm}
            />
        </div>
    );
};