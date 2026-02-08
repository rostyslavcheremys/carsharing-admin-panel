export const normalizeLocation = (loc, index) => {
    const lat = Number(loc.lat ?? loc.location?.lat);
    const lng = Number(loc.lng ?? loc.location?.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

    return {
        id: loc.id ?? `loc-${index}`,
        lat,
        lng,
        status: loc.status ?? "available",
    };
};
