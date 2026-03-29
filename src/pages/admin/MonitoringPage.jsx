import { Loader , Map } from "../../components/index.js";

import { useCollection } from "../../hooks/index.js";

export const MonitoringPage = () => {
    const {
        data: cars,
        isLoading,
        error,
    } = useCollection("cars");

    return (
        <Loader isLoading={isLoading} error={error}>
            <div className="page">
                <Map cars={cars}/>
            </div>
        </Loader>
    );
}