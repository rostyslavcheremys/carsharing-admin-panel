import { useNavigate } from "react-router-dom";

import { IconButton } from "../../libs/mui.js";
import { EditIcon, DeleteIcon } from "../../libs/mui-icons.js";

import { DialogCell, ConfirmDialog,} from "../index.js";

export const CarActions = ({ carId, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/cars/${carId}/edit`);
    };

    return (
        <div className="car-actions">
            <IconButton onClick={handleEdit}>
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
                            message="Видалити автомобіль?"
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