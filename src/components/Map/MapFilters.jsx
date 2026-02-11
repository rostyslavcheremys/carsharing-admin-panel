import { useState } from "react";

import {
    IconButton,
    Menu,
    MenuItem,
    Checkbox,
    FormControlLabel
} from "../../libs/mui";

import { FilterListIcon } from "../../libs/mui-icons";

import { CAR_STATUS_FILTER } from "../../constants";

export const MapFilters = ({ selectedStatus, onChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleToggle = (status) => {
        const currentIndex = selectedStatus.indexOf(status);
        const newChecked = [...selectedStatus];

        if (currentIndex === -1) {
            newChecked.push(status);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        onChange(newChecked);
    }

    return (
        <div className="map-filters">
            <div className="map-filters__button">
                <IconButton
                    className="map__icon"
                    onClick={handleClick}
                >
                    <FilterListIcon />
                </IconButton>
            </div>

            <Menu
                className="map-filters__menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {CAR_STATUS_FILTER.map((status) => (
                    <MenuItem
                        className="map-filters__menu-item"
                        key={status.value}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    className="map-filters__checkbox"
                                    checked={selectedStatus.includes(status.value)}
                                    onChange={() => handleToggle(status.value)}
                                />
                            }
                            label={
                                <span className="map-filters__label">{status.label}</span>
                            }
                        />
                    </MenuItem>
                ))}

                {selectedStatus.length > 0 && (
                    <MenuItem
                        className="map-filters__menu-item map-filters__menu-item--reset"
                        onClick={() => { onChange([]); handleClose(); }}
                    >
                        Скинути фільтри
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}