import { FormButton } from "../../components";

export const FormLocation = ({ label, value, onOpen, disabled }) => {
    return (
        <div className="form">
            <span className="form__label">{label}</span>

            <FormButton
                className="form__location"
                disabled={disabled}
                onClick={onOpen}
            >
                {value ? `${value.lat.toFixed(5)}, ${value.lng.toFixed(5)}` : "Вибрати"}
            </FormButton>
        </div>
    );
}