import { useNavigate } from "react-router-dom";

import { Loader, AppButton } from "../../../components";

import { USER } from "../../../constants";

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Loader /*isLoading={loading} error={error}*/>
            <div className="page page__content">
                <span className="page__title"></span>

                <div className="page__button">
                    <AppButton
                        type="button"
                        label="Карта"
                        onClick={() => navigate(USER.MAP)}
                    />
                </div>
            </div>
        </Loader>
    );
}