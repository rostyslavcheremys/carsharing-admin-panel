import { Button } from "../../libs/mui";

export const AppButton = ({ className, label, type, onClick, disabled }) => {
    return (
        <Button
            className={`app-button ${className || ''} ${disabled ? 'disabled' : ''}`}
            type={type}
            onClick={onClick}
        >
            {label}
        </Button>
    );
}
