import { useNavigate } from "react-router-dom";

import { carBanner } from "../../assets/icons";

import { AppButton } from "../../components";

import { USER } from "../../constants";

export const HomeHero = () => {
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero__content">
                <span className="hero__title">Каршерінг<br/>Сервіс</span>

                <span className="hero__subtitle">
                    Швидкий доступ до автомобілів у будь-який час
                </span>

                <div className="page__button">
                    <AppButton
                        type="button"
                        className="app-button--size-md"
                        label="Знайти автомобіль"
                        onClick={() => navigate(USER.MAP)}
                    />
                </div>
            </div>

            <img
                src={carBanner}
                className="hero__image"
                alt="Car banner"
            />
        </section>
    );
}