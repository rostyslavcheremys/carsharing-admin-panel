import { httpsCallable } from "firebase/functions";

import { functions } from "../firebase";

export class UserService {
    static async deleteUser(userId){
        const callable = httpsCallable(functions, "deleteUser");

        const result = await callable({ userId });

        return result.data;
    }
}