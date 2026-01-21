import { CircularProgress } from "../../libs/mui.js";

export const Loader = ({ isLoading, error, errorText, children }) => {
    if (isLoading) {
        return (
            <div className="loader">
                <CircularProgress className="loader__spinner"/>
            </div>
        );
    }

    if (error) return <div className="loader__error">{errorText}</div>

    return <>{children}</>;
};