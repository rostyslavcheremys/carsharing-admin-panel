import { useState } from "react";

export const useMessageDialog = () => {
    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [onCloseCallback, setOnCloseCallback] = useState(null);

    const showMessage = (message, callback = null) => {
        setMessage(message);
        setMessageOpen(true);
        setOnCloseCallback(() => callback);
    };

    const handleMessageClose = () => {
        setMessageOpen(false);

        if (onCloseCallback) {
            onCloseCallback();
            setOnCloseCallback(null);
        }
    };

    return { messageOpen, message, showMessage, handleMessageClose };
}