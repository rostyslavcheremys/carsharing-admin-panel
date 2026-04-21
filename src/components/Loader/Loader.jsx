import { CircularProgress } from "../../libs/mui";

import { getErrorMessage } from "../../utils";

export const Loader = ({ isLoading, error, children }) => {
    if (isLoading) {
        return (
            <div className="loader">
                <CircularProgress className="loader__spinner"/>
            </div>
        );
    }

    if (error) {
        return <div className="loader__error">{getErrorMessage(error)}</div>;
    }

    return <>{children}</>;
}