import { useNavigate } from "react-router-dom";

import { IconButton } from "../../libs/mui.js";
import { Visibility, EditIcon, DeleteIcon } from "../../libs/mui-icons.js";

import { DialogCell, ConfirmDialog,} from "../index.js";

export const CarActions = ({ carId, onDelete }) => {
    const navigate = useNavigate();

    const handleEditCar = (e) => {
        e.stopPropagation();
        navigate(`/cars/${carId}/edit`);
    }

    const handleViewCar = (e) => {
        e.stopPropagation();
        navigate(`/cars/${carId}`);
    }

    return (
        <div className="car-actions">
            <IconButton onClick={handleViewCar}>
                <Visibility className="car-actions__icon"/>
            </IconButton>

            <IconButton onClick={handleEditCar}>
                <EditIcon className="car-actions__icon"/>
            </IconButton>

            <DialogCell>
                {({ open, onOpen, onClose }) => (
                    <>
                        <IconButton onClick={onOpen}>
                            <DeleteIcon className="car-actions__icon"/>
                        </IconButton>

                        <ConfirmDialog
                            open={open}
                            message={`Видалити автомобіль з ID: ${carId}?`}
                            onCancel={onClose}
                            onConfirm={() => {
                                onClose();
                                onDelete(carId);
                            }}
                        />

                    </>
                )}
            </DialogCell>
        </div>
    );
}