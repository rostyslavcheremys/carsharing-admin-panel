import { FormButton } from "../../components";

export const FormLocation = ({ label, value, onOpen, disabled, error }) => {
    return (
        <div className="form">
            <span className="form__label">{label}</span>

            <FormButton
                className={`form__location ${error ? "form__error" : ""}`}
                disabled={disabled}
                onClick={onOpen}
                error={error}
            >
                {value ? `${value.lat.toFixed(5)}, ${value.lng.toFixed(5)}` : "Вибрати"}
            </FormButton>
        </div>
    );
}