export const MAP_TYPES = ["roadmap", "hybrid"];

export const DEFAULT_ZOOM = 14;
export const MIN_ZOOM = 1;
export const MAX_ZOOM = 17;

export const WORLD_BOUNDS = {
    north: 85,
    south: -85,
    west: -180,
    east: 180,
}

export const CAR_STATUS_FILTER = [
    { value: "available", label: "Доступні" },
    { value: "rented", label: "Орендовані" },
    { value: "unavailable", label: "Неактивні" },
];