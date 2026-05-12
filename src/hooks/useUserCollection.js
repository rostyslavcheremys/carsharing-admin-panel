import { useAuth } from "./useAuth";
import { useWhereClause } from "./useWhereClause";
import { useCollection } from "./useCollection";

export const useUserCollection = (collectionName, field = "userId") => {
    const { user } = useAuth();

    const whereClause = useWhereClause(field, user?.id);

    return useCollection(collectionName, {
        where: whereClause
    });
};