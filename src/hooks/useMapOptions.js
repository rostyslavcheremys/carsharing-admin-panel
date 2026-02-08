import { useMemo } from "react";

import { useTheme } from "../hooks";

import { WORLD_BOUNDS } from "../constants";

import { darkMap, lightMap } from "../styles";

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