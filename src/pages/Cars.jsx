import {
    useCallback,
    useMemo,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import {
    AppButton,
    DataTable,
    Loader,
    CarActions,
    MessageDialog
} from "../components";

import {
    useCollection,
    useMessageDialog
} from "../hooks";

import { deleteCar } from "../services";

import { CARS_TABLE_COLUMNS } from "../constants";

export const Cars = () => {
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
                        <CarActions
                            carId={car.id}
                            onDelete={handleDelete}
                        />
                    )
                }
            }
            return column;
        });
    }, [handleDelete]);

    return (
        <Loader isLoading={isLoading || isDeleting} error={error}>
            <div className="page table">
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