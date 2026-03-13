import { useNavigate } from "react-router-dom";

import { DataTable, Loader } from "../components";

import { useCollection } from "../hooks";

import { BOOKINGS_TABLE_COLUMNS } from "../constants";

export const Bookings = () => {
    const navigate = useNavigate();

    const {
        data: bookings,
        isLoading,
        error,
    } = useCollection("bookings");

    console.log(bookings);

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Керування бронюваннями</span>

                <DataTable
                    rows={bookings}
                    columns={BOOKINGS_TABLE_COLUMNS(navigate)}
                />
            </div>
        </Loader>
    );
}