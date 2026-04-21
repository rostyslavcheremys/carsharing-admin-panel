import { useCallback } from "react";

export const useNearestCar = (filteredCars, setIndex, mapRef, showMessage) => {
    return useCallback(() => {
        if (!navigator.geolocation) {
            showMessage("Геолокація не підтримується вашим браузером!");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userCoords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }

                let nearestIndex = -1;
                let minDistance = Infinity;
                let nearestCoords = null;

                filteredCars.forEach((car, idx) => {
                    if (!car.lat || !car.lng) return;

                    const carCoords = {
                        lat: Number(car.lat),
                        lng: Number(car.lng),
                    };

                    const distance = Math.sqrt(
                        Math.pow(userCoords.lat - carCoords.lat, 2) +
                        Math.pow(userCoords.lng - carCoords.lng, 2)
                    );

                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestIndex = idx;
                        nearestCoords = carCoords;
                    }
                });

                if (nearestIndex !== -1) {
                    setIndex(nearestIndex);

                    if (mapRef.current && nearestCoords) {
                        mapRef.current.panTo(nearestCoords);
                    }
                } else {
                    showMessage("Доступних автомобілів не знайдено!");
                }
            },
            () => {
                showMessage("Неможливо визначити ваше місцезнаходження!");
            },
            {enableHighAccuracy: true}
        );
    }, [filteredCars, setIndex, mapRef, showMessage]);
}