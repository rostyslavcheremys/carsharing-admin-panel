import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Loader,
    CarAccessButton,
    AppButton,
} from "../../../components";

export const CarAccessPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleOpen = async () => {
        setLoading(true);
        try {

            setIsOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = async () => {
        setLoading(true);
        try {

            setIsOpen(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Loader>
            <div className="page page__content">
                <span className="page__title">
                    Автомобіль {isOpen ? "Відкрито" : "Закрито"}
                </span>

                <CarAccessButton
                    isOpen={isOpen}
                    onClick={isOpen ? handleClose : handleOpen}
                    loading={loading}
                />

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="Назад"
                        onClick={() => navigate(-1)}
                        disabled={loading}
                    />
                </div>
            </div>
        </Loader>
    );
};