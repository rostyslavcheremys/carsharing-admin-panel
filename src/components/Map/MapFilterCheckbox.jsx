import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
} from "../../libs/mui";

import { ExpandMoreIcon } from "../../libs/mui-icons";

export const MapFilterCheckbox = ({ filter, filters, onToggle }) => {
    const { key, items, label } = filter;

    const isActive = (value) => filters[key]?.includes(value);

    const getClass = (base, active) => `${base}${active ? " active" : ""}`;

    return (
        <Accordion className="map-filters__accordion">
            <AccordionSummary
                className="map-filters__accordion-summary"
                expandIcon={<ExpandMoreIcon />}
            >
                <span className="map-filters__accordion-label">{label}</span>
            </AccordionSummary>

            <AccordionDetails className="map-filters__accordion-details">
                <div className="map-filters__accordion-list">
                    {items.map(item => {
                        const active = isActive(item.value);

                        return (
                            <label
                                key={item.value}
                                className={getClass("map-filters__list-item-button", active)}
                            >
                                <Checkbox
                                    checked={active}
                                    className={getClass("map-filters__checkbox", active)}
                                    onChange={() => onToggle(key, item.value)}
                                />

                                <span className={getClass("map-filters__checkbox-label", active)}>
                                    {item.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </AccordionDetails>
        </Accordion>
    );
}