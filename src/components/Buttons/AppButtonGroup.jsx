import { ButtonGroup, Button } from "../../libs/mui";

export const AppButtonGroup = ({
                                   buttons = [],
                                   selected = [],
                                   onClick = () => {}
                               }) => {
    const handleToggle = (value) => {
        if (selected.includes(value)) {
            onClick(selected.filter(v => v !== value));
        } else {
            onClick([...selected, value]);
        }
    }

    return (
        <ButtonGroup className="app-button-group" orientation="vertical">
            {buttons.map(btn => (
                <Button
                    key={btn.value}
                    className={`app-button-group__button ${selected.includes(btn.value) ? "active" : ""}`}
                    onClick={() => handleToggle(btn.value)}
                >
                    {btn.label}
                </Button>
            ))}
        </ButtonGroup>
    );
}