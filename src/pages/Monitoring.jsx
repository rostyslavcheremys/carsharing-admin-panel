import { Loader , Map } from "../components";

import { useCollection} from "../hooks";

export const Monitoring = () => {
    const {
        data: cars,
        isLoading,
        /*error,*/
    } = useCollection("cars");

    return (
        <Loader isLoading={isLoading}>
            <div className="page">
                <Map cars={cars}/>
            </div>
        </Loader>
    );
}