import {
    DataTable,
    Loader,
    Actions, MessageDialog
} from "../../../components/index.js";

import {
    useAuth,
    useCollection, useDelete, useMessageDialog,
    useTableColumns
} from "../../../hooks/index.js";

import { getActionMessage } from "../../../utils/index.js";

import { UserService } from "../../../services/index.js";

import { USERS_TABLE_COLUMNS, USER_ACTIONS } from "../../../constants/index.js";

export const UsersManagementPage = () => {
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

    console.log(users);

    const { user: currentUser } = useAuth();

    const { isDeleting, handleDelete } = useDelete(UserService.deleteUser, showMessage);

    const handleUserDelete = (id) => handleDelete(id, "Користувача видалено!");

    const columns = useTableColumns(USERS_TABLE_COLUMNS, {
        actions: (user) => (
            <Actions
                id={user.id}
                actions={USER_ACTIONS(handleUserDelete)}
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