import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

const deleteUserCallable = httpsCallable(functions, "deleteUser");

export class UserService {
    static async deleteUser(userId){
        const result = await deleteUserCallable({ userId });
        return result.data;
    }
}