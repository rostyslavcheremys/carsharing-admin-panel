import { IconButton } from "../../libs/mui";

import { ArrowBackIcon, ArrowForwardIcon } from "../../libs/mui-icons";

export const MapStepper = ({
                               current,
                               total,
                               onPrev,
                               onNext
                           }) => {
    return (
        <nav className="map-stepper">
            <IconButton
                className="map__icon"
                onClick={onPrev}
                disabled={total <= 1}
            >
                <ArrowBackIcon />
            </IconButton>

            <span className="map-stepper__counter">
                {total > 0 ? `${current} / ${total}` : "0 / 0"}
            </span>

            <IconButton
                className="map__icon"
                onClick={onNext}
                disabled={total <= 1}
            >
                <ArrowForwardIcon />
            </IconButton>
        </nav>
    );
}