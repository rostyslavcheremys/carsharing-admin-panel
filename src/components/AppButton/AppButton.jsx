import { Button } from "../../libs/mui.js";

export const AppButton = ({ label, type, onClick, disabled }) => {
    return (
        <Button
            className="app-button"
            variant="contained"
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </Button>
    );
}
