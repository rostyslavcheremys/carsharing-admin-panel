import { Link } from "react-router-dom";

export const DetailsLink = ({ to, label = "Переглянути" }) => {
    return (
        <Link to={to} className="details-link">
            {label}
        </Link>
    );
};