import { useNavigate } from "react-router-dom";

import {
    AppButton,
    DataTable,
    Loader
} from "../components";

import { useCollection } from "../hooks";

import { CARS_TABLE_COLUMNS } from "../constants";

export const Cars = () => {
    const navigate = useNavigate();

    const {
        data: cars,
        isLoading,
        error,
    } = useCollection("cars");

    console.log(cars);

    const handleCreate = () => {
        navigate("/cars/new");
    };

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page">
                <span className="page__title">Керування автомобілями</span>

                <header className="page__header">
                    <AppButton
                        className="cars__app-button"
                        label="Додати автомобіль"
                        onClick={handleCreate}
                    />
                </header>

                <DataTable rows={cars} columns={CARS_TABLE_COLUMNS} />
            </div>
        </Loader>
    );
}