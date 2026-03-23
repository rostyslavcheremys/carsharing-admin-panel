import { useNavigate } from "react-router-dom";

import {
    AppButton,
    DataTable,
    Loader,
    MessageDialog,
    Actions
} from "../../components";

import {
    useCollection,
    useDelete,
    useMessageDialog,
    useTableColumns
} from "../../hooks";

import { getActionMessage } from "../../utils";

import { CarService } from "../../services";

import { CARS_TABLE_COLUMNS, CAR_ACTIONS } from "../../constants";

export const CarsManagementPage = () => {

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    const navigate = useNavigate();

    const {
        data: cars,
        isLoading,
        error,
    } = useCollection("cars");

    console.log(cars);

    const handleAdd = () => navigate("/cars/add");

    const { isDeleting, handleDelete } = useDelete(CarService.deleteCar, showMessage);

    const handleCarDelete = (id) => handleDelete(id, "Автомобіль видалено!");

    const columns = useTableColumns(CARS_TABLE_COLUMNS, {
        actions: (car) => (
            <Actions
                id={car.id}
                actions={CAR_ACTIONS(handleCarDelete)}
                getMessage={getActionMessage}
                entity="car"
            />
        ),
    });

    return (
        <Loader isLoading={isLoading || isDeleting} error={error}>
            <div className="page page__content">
                <span className="page__title">Керування автомобілями</span>

                <div className="page__header">
                    <AppButton
                        className="app-button--wide"
                        label="Додати автомобіль"
                        onClick={handleAdd}
                    />
                </div>

                <DataTable rows={cars} columns={columns} />

                <MessageDialog
                    open={messageOpen}
                    onClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
}