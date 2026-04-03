import { useNavigate, useParams } from "react-router-dom";

import {
    Loader,
    Details,
    AppButton,
} from "../../../components";

import { useDocument } from "../../../hooks";

import { USER_DETAILS } from "../../../constants";

export const UserDetailsPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        document: user, isLoading, error
    } = useDocument("users", id);

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page page__content">
                <span className="page__title">Користувач</span>

                <Details data={user} details={USER_DETAILS} />

                <div className="page__button">
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