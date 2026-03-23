import { httpsCallable } from "firebase/functions";

import { functions } from "../firebase";

export const deleteUser = async (userId) => {
    const callable = httpsCallable(functions, "deleteUser");

    const result = await callable({ userId });

    return result.data;
}