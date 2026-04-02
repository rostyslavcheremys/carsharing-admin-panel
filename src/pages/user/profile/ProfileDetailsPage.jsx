import { useNavigate, useParams } from "react-router-dom";

import {
    Loader,
    Details,
    AppButton,
} from "../../../components";

import { useDocument } from "../../../hooks";

import { PROFILE_DETAILS, USER } from "../../../constants";

export const ProfileDetailsPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: user, isLoading, error
    } = useDocument("users", id);

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Інформація профілю</span>

                <Details data={user} details={PROFILE_DETAILS} />

                <div className="page__buttons">
                    <AppButton
                        type="button"
                        label="Редагувати"
                        onClick={() => navigate(USER.profileEdit(user?.id))}
                        disabled={isLoading}
                    />

                    <AppButton
                        type="button"
                        label="Назад"
                        onClick={() => navigate(-1)}
                        disabled={isLoading}
                    />
                </div>
            </div>
        </Loader>
    );
}