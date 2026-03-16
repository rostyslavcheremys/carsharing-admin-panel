export const getTripLocation = (trip, key) => {
    const loc = trip?.[key];

    if (loc?._lat != null && loc?._long != null) {
        return { lat: Number(loc._lat), lng: Number(loc._long) };
    }

    return null;
};