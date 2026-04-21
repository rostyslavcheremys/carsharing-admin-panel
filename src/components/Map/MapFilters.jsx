import { useState } from "react";

import { Drawer } from "../../libs/mui";

import { FilterListIcon, CloseIcon } from "../../libs/mui-icons";

import {
    ActionIconButton,
    AppButton,
    MapFilterCheckbox,
    MapFilterSlider,
} from "../../components";

import { MAP_FILTERS } from "../../constants";

export const MapFilters = ({ filters, onChange, userMode = false }) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state) => () => setOpen(state);

    const activeFilters = MAP_FILTERS.filter(f => {
        return !(userMode && f.key === "status");
    });

    const handleCheckboxToggle = (type, value) => {
        const current = filters[type] || [];

        const updated = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];

        onChange({ ...filters, [type]: updated });
    }

    const handleRangeChange = (key, value) => {
        onChange({ ...filters, [key]: value });
    }

    const resetFilters = () => {
        const reset = {};

        MAP_FILTERS.forEach(filter => {
            if (filter.type === "checkbox") reset[filter.key] = [];
            if (filter.type === "range") reset[filter.key] = [filter.min, filter.max];
        });

        onChange(reset);
    }

    const hasActiveFilters = MAP_FILTERS.some(filter => {
        const value = filters[filter.key];

        if (filter.type === "checkbox") return value?.length > 0;
        if (filter.type === "range") return value && (value[0] !== filter.min || value[1] !== filter.max);

        return false;
    });

    return (
        <div className="map-filters">
            <ActionIconButton
                className="map__icon"
                title={"Фільтри"}
                placement={"right"}
                Icon={FilterListIcon}
                onClick={toggleDrawer(true)}
            />

            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                anchor={userMode ? "left" : "right"}
            >
                <div className="map-filters__header">
                    <span className="map-filters__title">Фільтри</span>

                    <ActionIconButton
                        Icon={CloseIcon}
                        onClick={toggleDrawer(false)}
                        iconClassName="map-filters__icon"
                    />
                </div>

                <div className="map-filters__content">
                    <AppButton
                        type="button"
                        label="Скинути фільтри"
                        className="map-filters__button"
                        onClick={resetFilters}
                        disabled={!hasActiveFilters}
                    />

                    {activeFilters.map(filter => {
                        if (filter.type === "checkbox") {
                            return (
                                <MapFilterCheckbox
                                    key={filter.key}
                                    filter={filter}
                                    filters={filters}
                                    onToggle={handleCheckboxToggle}
                                />
                            );
                        }

                        if (filter.type === "range") {
                            return (
                                <MapFilterSlider
                                    key={filter.key}
                                    filter={filter}
                                    filters={filters}
                                    onChange={handleRangeChange}
                                />
                            );
                        }

                        return null;
                    })}
                </div>
            </Drawer>
        </div>
    );
}