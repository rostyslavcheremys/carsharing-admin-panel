import {Loader, Map } from "../../components";

import { useCollection } from "../../hooks";

export const MonitoringPage = () => {
    const {
        data: cars,
        isLoading,
        error,
    } = useCollection("cars");

    console.log(cars);

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page">
                <Map cars={cars}/>
            </div>
        </Loader>
    );
}