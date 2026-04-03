import {
    Actions,
    Loader,
    DataTable,
    MessageDialog
} from "../../../components";

import {
    useMessageDialog,
    useCollection,
    useAuth,
    useDelete,
    useTableColumns
} from "../../../hooks";

import { UserService } from "../../../services";

import { USERS_TABLE_COLUMNS, USER_ACTIONS } from "../../../constants";

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

    const { user: currentUser, loading } = useAuth();

    const { isDeleting, handleDelete } = useDelete(UserService.deleteUser);

    const columns = useTableColumns(USERS_TABLE_COLUMNS, {
        actions: (user) => (
            <Actions
                id={user?.id}
                actions={USER_ACTIONS(handleDelete, showMessage)}
                currentState={user}
                currentUser={currentUser}
            />
        ),
    });

    return (
        <Loader isLoading={isLoading || isDeleting || loading} error={error}>
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