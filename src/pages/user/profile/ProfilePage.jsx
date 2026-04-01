import { useNavigate } from "react-router-dom";

import { Loader, AppButton } from "../../../components";

import { useAuth } from "../../../hooks";

import { USER } from "../../../constants";

export const ProfilePage = () => {
    const navigate = useNavigate();

    const { user, loading } = useAuth();

    return (
        <Loader isLoading={loading}>
            <div className="page page__content">
                <span className="page__title">Вітаємо, {user.firstName || "Користувач"}!</span>

                <div className="page__buttons page__buttons--column">
                    <AppButton
                        type="button"
                        label="Профіль"
                        onClick={() => navigate(USER.profileDetails(user.id))}
                        disabled={loading}
                    />

                    <AppButton
                        type="button"
                        label="Бронювання"
                        onClick={() => navigate(USER.BOOKINGS_HISTORY)}
                        disabled={loading}
                    />

                    <AppButton
                        type="button"
                        label="Поїздки"
                        onClick={() => navigate(USER.TRIPS_HISTORY)}
                        disabled={loading}
                    />

                    <AppButton
                        type="button"
                        label="Допомога"
                        onClick={() => navigate(USER.HELP)}
                        disabled={loading}
                    />

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
}