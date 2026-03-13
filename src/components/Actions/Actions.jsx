import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ActionIconButton, ConfirmDialog } from "../../components";

export const Actions = ({ id, actions, getMessage, entity }) => {
    const navigate = useNavigate();
    const [action, setAction] = useState(null);

    const openDialog = (type) => (e) => {
        e.stopPropagation();
        setAction(type);
    }

    const closeDialog = () => setAction(null);

    const handleConfirm = () => {
        const actionConfig = actions.find((a) => a.type === action);

        if (actionConfig?.handler) actionConfig.handler({ id, navigate });

        closeDialog();
    }

    return (
        <div className="actions">
            {actions.map(({ type, Icon }) => (
                <ActionIconButton
                    key={type}
                    Icon={Icon}
                    onClick={openDialog(type)}
                    iconClassName="icon-button"
                />
            ))}

            <ConfirmDialog
                open={Boolean(action)}
                message={getMessage(entity, action, id)}
                onCancel={closeDialog}
                onConfirm={handleConfirm}
            />
        </div>
    );
}