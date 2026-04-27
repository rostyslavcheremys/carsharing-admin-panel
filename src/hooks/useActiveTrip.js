import { useAuth, useEntity } from "../hooks";

import { TripService } from "../services";

export const useActiveTrip = () => {
    const { user } = useAuth();

    return useEntity(user?.id, TripService.getActiveTripByUser);
}