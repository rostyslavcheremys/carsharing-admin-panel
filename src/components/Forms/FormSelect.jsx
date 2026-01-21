import {
    FormControl,
    Select,
    MenuItem
} from "../../libs/mui.js";

export const FormSelect = ({ label, name, value, onChange, options = [] }) => {
    return (
        <div className="form">
            <label className="form__label">{label}</label>

            <FormControl className="form__field">
                <Select
                    value={value}
                    onChange={onChange}
                    name={name}
                    MenuProps={{
                        PaperProps: {
                            className: "form__select"
                        }
                    }}
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            className="form__menu"
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
