import { Loader , MonitoringMap } from "../components";

import {useCollection} from "../hooks";

export const Map = () => {
    const {
        data: cars,
        isLoading,
        /*error,*/
    } = useCollection("cars");

    return (
        <Loader isLoading={isLoading}>
            <div className="page">
                <span className="page__title">Моніторинг автомобілів</span>

                <MonitoringMap cars={cars}/>
            </div>
        </Loader>
    );
}