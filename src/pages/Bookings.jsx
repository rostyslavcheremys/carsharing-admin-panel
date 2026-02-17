import { DataTable, Loader } from "../components";

import { useCollection } from "../hooks";

import { USERS_TABLE_COLUMNS } from "../constants";

export const Bookings = () => {
    const {
        data: users,
        isLoading,
        error,
    } = useCollection("users");

    console.log(users);

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Перегляд бронювань</span>

                <DataTable
                    rows={users}
                    columns={USERS_TABLE_COLUMNS}
                />
            </div>
        </Loader>
    );
}