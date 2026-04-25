import { useAuth } from "../hooks";

import { TripService } from "../services";

import { useActiveEntity } from "../hooks";

export const useActiveTrip = () => {
    const { user } = useAuth();

    return useActiveEntity(
        user,
        TripService.getActiveTripByUser
    );
}