import { useMemo } from "react";

import { useJsApiLoader } from "@react-google-maps/api";

export const useGoogleMapsLoader = () => {
    const loaderOptions = useMemo(() => ({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        language: "uk",
        region: "UA",
    }), []);

    return useJsApiLoader(loaderOptions);
}