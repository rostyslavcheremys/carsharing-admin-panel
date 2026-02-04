import { Button } from "../../libs/mui";

export const FormButton = ({className, disabled, children}) => {
    return(
        <Button
            className={className}
            component="label"
            variant="outlined"
            disabled={disabled}
        >
            {children}
        </Button>
    );
}