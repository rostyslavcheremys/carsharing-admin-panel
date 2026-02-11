import { useMemo } from "react";

import { useTheme } from "../index.js";

import { WORLD_BOUNDS } from "../../constants/index.js";

import { darkMap, lightMap } from "../../styles/index.js";

export const useMapOptions = () => {
    const { darkMode } = useTheme();

    return useMemo(() => ({
        styles: darkMode ? darkMap : lightMap,
        disableDefaultUI: true,
        restriction: {
            latLngBounds: WORLD_BOUNDS,
            strictBounds: true,
        },
    }), [darkMode]);
}