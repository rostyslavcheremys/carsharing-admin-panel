import { Link } from "react-router-dom";

export const AuthRedirect = ({ text, linkText, to }) => {
    return (
        <div className="auth-redirect">
            <span>{text}</span>

            <Link to={to} className="auth-redirect__link">
                {linkText}
            </Link>
        </div>
    );
};