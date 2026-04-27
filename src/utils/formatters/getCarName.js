export const getCarName = (car) => {
    if (!car) return "—";
    return `${car.brand} ${car.model} • ${car.licensePlate}`;
}