import { Button } from "../../libs/mui";

export const AppButton = ({ className, label, type, onClick, disabled }) => {
    return (
        <Button
            className={`app-button ${className || ''}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </Button>
    );
}
