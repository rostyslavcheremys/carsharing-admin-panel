import { useState } from "react";

export const DialogCell = ({ children }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = (e) => {
        e?.stopPropagation();
        setOpen(true);
    };

    const handleClose = (e) => {
        e?.stopPropagation();
        setOpen(false);
    };

    return children({
        open,
        onOpen: handleOpen,
        onClose: handleClose,
    });
}