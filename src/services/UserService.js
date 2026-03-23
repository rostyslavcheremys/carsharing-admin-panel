import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const deleteUserFn = httpsCallable(functions, "deleteUser");

export class UserService {
    static async deleteUser(userId) {
        const result = await deleteUserFn({ userId });
        return result.data;
    }
}