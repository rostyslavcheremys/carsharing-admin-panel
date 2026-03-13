import { useMemo } from "react";

import { DataTable, Loader, Actions } from "../../components/index.js";

import { useCollection } from "../../hooks/index.js";

import { USERS_TABLE_COLUMNS, USER_ACTIONS } from "../../constants/index.js";

import { getActionMessage } from "../../utils/index.js";

export const UsersManagement = () => {
    const {
        data: users,
        isLoading,
        error,
    } = useCollection("users");

    console.log(users);

    const columns = useMemo(() => {
        return USERS_TABLE_COLUMNS.map((column) => {
            if (column.id === "actions") {
                return {
                    ...column,
                    render: (user) =>
                        <Actions
                            id={user.id}
                            actions={USER_ACTIONS}
                            getMessage={getActionMessage}
                            entity="user"
                        />
                };
            }
            return column;
        });
    }, []);

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Керування користувачами</span>

                <DataTable rows={users} columns={columns} />
            </div>
        </Loader>
    );
}