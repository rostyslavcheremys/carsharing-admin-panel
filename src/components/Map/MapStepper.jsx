import { ArrowBackIcon, ArrowForwardIcon } from "../../libs/mui-icons";

import { ActionIconButton } from "../../components";

export const MapStepper = ({
                               current,
                               total,
                               onPrev,
                               onNext
                           }) => {
    return (
        <div className="map-stepper">
            <ActionIconButton
                Icon={ArrowBackIcon}
                className="map__icon"
                onClick={onPrev}
                disabled={total <= 1}
            />

            <span className="map-stepper__counter">
                {total > 0 ? `${current} / ${total}` : "0 / 0"}
            </span>

            <ActionIconButton
                Icon={ArrowForwardIcon}
                className="map__icon"
                onClick={onNext}
                disabled={total <= 1}
            />
        </div>
    );
}