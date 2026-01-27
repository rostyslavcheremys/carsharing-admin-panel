import { DataTable, Loader } from "../components";

import { useCollection } from "../hooks";

import { CARS_TABLE_COLUMNS } from "../constants";

export const Cars = () => {
    const {
        data: cars,
        isLoading,
        error,
    } = useCollection("cars");

    console.log(cars);

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page">
                <span className="page__title">Керування автомобілями</span>


                <DataTable rows={cars} columns={CARS_TABLE_COLUMNS} />
            </div>
        </Loader>
    );
}