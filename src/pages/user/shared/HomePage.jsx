import  { Loader, HomeHero } from "../../../components";

export const HomePage = () => {
    return (
        <Loader>
            <div className="page page__content">
                <HomeHero />
            </div>
        </Loader>
    );
}