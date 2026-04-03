import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { LockIcon, LockOpenIcon } from "../../libs/mui-icons";
import { ActionIconButton, ConfirmDialog } from "../../components";

export const Actions = ({ id, actions = [], currentState, currentUser }) => {
    const navigate = useNavigate();
    const [activeAction, setActiveAction] = useState(null);
    const [loading, setLoading] = useState(false);

    const activeActionConfig = useMemo(
        () => actions.find((a) => a.type === activeAction),
        [activeAction, actions]
    );

    const openDialog = useCallback(
        (type) => async (e) => {
            e.stopPropagation();
            if (loading) return;

            const action = actions.find((a) => a.type === type);

            if (!action?.confirmMessage) {
                setLoading(true);
                try {
                    await action.handler({
                        id,
                        isBlocked: currentState?.isBlocked,
                        navigate,
                    });
                } finally {
                    setLoading(false);
                }
                return;
            }

            setActiveAction(type);
        },
        [actions, id, currentState?.isBlocked, navigate, loading]
    );

    const closeDialog = useCallback(() => setActiveAction(null), []);

    const handleConfirm = useCallback(async () => {
        if (!activeActionConfig) return;

        closeDialog();
        setLoading(true);

        try {
            await activeActionConfig.handler({
                id,
                isBlocked: currentState?.isBlocked,
                navigate,
            });
        } finally {
            setLoading(false);
        }
    }, [activeActionConfig, id, currentState?.isBlocked, navigate, closeDialog]);

    return (
        <>
            {actions.map(({ type, Icon, isAllowed }) => {
                const allowed =
                    isAllowed ? isAllowed(currentState, currentUser) : true;

                if (!allowed) return null;

                const DynamicIcon =
                    type === "block" && currentState
                        ? currentState.isBlocked
                            ? LockIcon
                            : LockOpenIcon
                        : Icon;

                return (
                    <ActionIconButton
                        key={type}
                        Icon={DynamicIcon}
                        onClick={openDialog(type)}
                        iconClassName="icon-button"
                        disabled={loading || !allowed}
                    />
                );
            })}

            {activeActionConfig?.confirmMessage && (
                <ConfirmDialog
                    open={Boolean(activeAction)}
                    message={activeActionConfig.confirmMessage({
                        isBlocked: currentState?.isBlocked,
                    })}
                    onCancel={closeDialog}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    );
}