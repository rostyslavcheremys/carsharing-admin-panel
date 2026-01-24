import { DataTable, Loader } from "../components";

import { useCollection } from "../hooks";

import { USERS_TABLE_COLUMNS } from "../constants";

export const Users = () => {
    const {
        data: users,
        isLoading,
        error,
    } = useCollection("users");

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page">
                <DataTable rows={users} columns={USERS_TABLE_COLUMNS}/>
            </div>
        </Loader>
    );
}