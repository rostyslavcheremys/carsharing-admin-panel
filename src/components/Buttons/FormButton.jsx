import { Button } from "../../libs/mui";

export const FormButton = ({
                               className,
                               disabled,
                               children,
                               onClick
                            }) => {
    return(
        <Button
            className={className}
            component="label"
            variant="outlined"
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}