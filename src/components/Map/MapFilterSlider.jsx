import { Slider } from "../../libs/mui";

export const MapFilterSlider = ({ filter, filters, onChange }) => {
    const value = filters[filter.key] || [filter.min, filter.max];

    const formatValue = (value) => `${value}${filter.suffix ? ` ${filter.suffix}` : ""}`;

    return (
        <div className="map-filters__slider-container">
            <span className="map-filters__accordion-label">{filter.label}</span>

            <Slider
                className="map-filters__slider"
                value={value}
                min={filter.min}
                max={filter.max}
                step={filter.step}
                onChange={(_, newValue) => onChange(filter.key, newValue)}
            />

            <div className="map-filters__slider-values">
                <span>{formatValue(value[0])}</span>
                <span>{formatValue(value[1])}</span>
            </div>
        </div>
    );
}