import { DataTable, Loader, Actions } from "../../components";

import { useCollection, useTableColumns } from "../../hooks";

import { getActionMessage } from "../../utils";

import { USERS_TABLE_COLUMNS, USER_ACTIONS } from "../../constants";

export const UsersManagement = () => {
    const {
        data: users,
        isLoading,
        error,
    } = useCollection("users");

    console.log(users);

    const columns = useTableColumns(USERS_TABLE_COLUMNS, {
        actions: (user) => (
            <Actions
                id={user.id}
                actions={USER_ACTIONS}
                getMessage={getActionMessage}
                entity="user"
            />
        ),
    });

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Керування користувачами</span>

                <DataTable rows={users} columns={columns} />
            </div>
        </Loader>
    );
}