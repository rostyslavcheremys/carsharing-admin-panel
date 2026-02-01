import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";

export const deleteCar = async (carId) => {
    const carDocRef = doc(db, "cars", carId);
    await deleteDoc(carDocRef);

    const imagesRef = ref(storage, `cars/${carId}`);
    const fileList = await listAll(imagesRef);
    const deletePromises = fileList.items.map((fileRef) => deleteObject(fileRef));

    await Promise.all(deletePromises);
}