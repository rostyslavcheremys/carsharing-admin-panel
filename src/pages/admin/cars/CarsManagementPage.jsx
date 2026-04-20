import { useNavigate } from "react-router-dom";

import {
    Actions,
    Loader,
    DataTable,
    AppButton,
    MessageDialog,
} from "../../../components";

import {
    useCollection,
    useDelete,
    useTableColumns,
    useMessageDialog
} from "../../../hooks";

import { CarService } from "../../../services";

import {
    CARS_TABLE_COLUMNS,
    CAR_ACTIONS,
    ADMIN
} from "../../../constants";

export const CarsManagementPage = () => {
    const navigate = useNavigate();

    const {
        data: cars,
        isLoading,
        error,
    } = useCollection("cars");

    const { isDeleting, handleDelete } = useDelete(CarService.delete);

    const columns = useTableColumns(CARS_TABLE_COLUMNS, {
        actions: (car) => (
            <Actions
                id={car?.id}
                actions={CAR_ACTIONS(handleDelete, showMessage)}
            />
        ),
    });

    const {
        messageOpen,
        message,
        showMessage,
        handleMessageClose,
    } = useMessageDialog();

    return (
        <Loader isLoading={isLoading || isDeleting} error={error}>
            <div className="page page__content">
                <span className="page__title">Керування автомобілями</span>

                <div className="page__header">
                    <AppButton
                        type="button"
                        className="app-button--large"
                        label="Додати автомобіль"
                        onClick={() => navigate(ADMIN.CAR_CREATE)}
                        disabled={isLoading || isDeleting || messageOpen}
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