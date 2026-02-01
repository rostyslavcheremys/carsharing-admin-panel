import { useNavigate } from "react-router-dom";

import { IconButton } from "../../libs/mui";
import { EditIcon, DeleteIcon } from "../../libs/mui-icons";

import { DialogCell, ConfirmDialog,} from "../../components";

export const CarActions = ({ carId, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/cars/${carId}/edit`);
    };

    return (
        <div className="car-actions">
            <IconButton onClick={handleEdit}>
                <EditIcon className="car-actions--icon"/>
            </IconButton>

            <DialogCell>
                {({ open, onOpen, onClose }) => (
                    <>
                        <IconButton onClick={onOpen}>
                            <DeleteIcon className="car-actions--icon"/>
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