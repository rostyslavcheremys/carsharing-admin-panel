import { useCallback, useState } from "react";

import {
    DataTable,
    Loader,
    Actions, MessageDialog
} from "../../components";

import {
    useAuth,
    useCollection, useMessageDialog,
    useTableColumns
} from "../../hooks";

import { getActionMessage, getErrorMessage } from "../../utils";

import { UserService } from "../../services";

import { USERS_TABLE_COLUMNS, USER_ACTIONS } from "../../constants";

export const UsersManagementPage = () => {
    const [isDeleting, setIsDeleting] = useState(false);

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    const {
        data: users,
        isLoading,
        error,
    } = useCollection("users");

    const { user: currentUser } = useAuth();

    console.log(users);

    const handleDelete = useCallback(async (id) => {
        try {
            setIsDeleting(true);
            await UserService.deleteUser(id);

            showMessage("Користувача видалено!");
        } catch (error) {
            showMessage(getErrorMessage(error));
        } finally {
            setIsDeleting(false);
        }
    }, [showMessage]);

    const columns = useTableColumns(USERS_TABLE_COLUMNS, {
        actions: (user) => (
            <Actions
                id={user.id}
                actions={USER_ACTIONS(handleDelete)}
                getMessage={getActionMessage}
                entity="user"
                currentState={user}
                currentUser={currentUser}
            />
        ),
    });

    return (
        <Loader isLoading={isLoading || isDeleting} error={error}>
            <div className="page page__content">
                <span className="page__title">Керування користувачами</span>

                <DataTable rows={users} columns={columns} />

                <MessageDialog
                    open={messageOpen}
                    onClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
}