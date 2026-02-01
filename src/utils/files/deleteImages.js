import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase";

export const deleteImages = async (urls = []) => {
    await Promise.all(
        urls.map((url) => {
            const storageRef = ref(storage, url);
            return deleteObject(storageRef).catch(() => {});
        })
    );
}
