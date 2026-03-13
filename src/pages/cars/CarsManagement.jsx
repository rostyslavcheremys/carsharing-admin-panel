import { useCallback, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";

import {
    AppButton,
    DataTable,
    Loader,
    MessageDialog, Actions
} from "../../components/index.js";

import {
    useCollection,
    useMessageDialog
} from "../../hooks/index.js";

import { getActionMessage } from "../../utils/index.js";

import { deleteCar } from "../../services/index.js";

import { CARS_TABLE_COLUMNS, CAR_ACTIONS } from "../../constants";

export const CarsManagement = () => {
    const [isDeleting, setIsDeleting] = useState(false);

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

    const handleAdd = () => {
        navigate("/cars/add");
    }

    const handleDelete = useCallback(async (id) => {
        try {
            setIsDeleting(true);
            await deleteCar(id);

            showMessage("Автомобіль видалено!");
        } catch (error) {
            showMessage("Помилка: " + error.message);
        } finally {
            setIsDeleting(false);
        }
    }, [showMessage]);

    const columns = useMemo(() => {
        return CARS_TABLE_COLUMNS.map((column) => {
            if (column.id === "actions") {
                return {
                    ...column,
                    render: (car) => (
                        <Actions
                            id={car.id}
                            actions={CAR_ACTIONS(handleDelete)}
                            getMessage={getActionMessage}
                            entity="car"
                        />
                    )
                }
            }
            return column;
        });
    }, [handleDelete]);

    return (
        <Loader isLoading={isLoading || isDeleting} error={error}>
            <div className="page page__content">
                <span className="page__title">Керування автомобілями</span>

                <header className="page__header">
                    <AppButton
                        className="cars__app-button"
                        label="Додати автомобіль"
                        onClick={handleAdd}
                    />
                </header>

                <DataTable
                    rows={cars}
                    columns={columns}
                />

                <MessageDialog
                    open={messageOpen}
                    onClose={handleMessageClose}
                    message={message}
                />
            </div>
        </Loader>
    );
}