import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { IconButton } from "../../libs/mui";

import { Visibility, EditIcon, DeleteIcon } from "../../libs/mui-icons";

import { ConfirmDialog } from "../../components";

import { getCarActionsMessage } from "../../utils";

export const CarActions = ({ carId, onDelete }) => {
    const navigate = useNavigate();

    const [action, setAction] = useState(null);

    const openDialog = (type) => (e) => {
        e.stopPropagation();
        setAction(type);
    }

    const closeDialog = () => setAction(null);

    const handleConfirm = () => {
        if (action === "view") navigate(`/cars/${carId}`);
        if (action === "edit") navigate(`/cars/${carId}/edit`);
        if (action === "delete") onDelete(carId);

        closeDialog();
    }

    return (
        <div className="car-actions">
            <IconButton onClick={openDialog("view")}>
                <Visibility className="car-actions__icon" />
            </IconButton>

            <IconButton onClick={openDialog("edit")}>
                <EditIcon className="car-actions__icon" />
            </IconButton>

            <IconButton onClick={openDialog("delete")}>
                <DeleteIcon className="car-actions__icon" />
            </IconButton>

            <ConfirmDialog
                open={Boolean(action)}
                message={getCarActionsMessage(action, carId)}
                onCancel={closeDialog}
                onConfirm={handleConfirm}
            />
        </div>
    );
}