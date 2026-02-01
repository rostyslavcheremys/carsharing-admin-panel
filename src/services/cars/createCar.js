import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

import {
    uploadImages,
    formToCar
} from "../../utils";

export const createCar = async (data) => {
    const newCarRef = doc(collection(db, "cars"));
    const newCarId = newCarRef.id;

    let imageUrls = [];

    if (data.images && data.images.length > 0) {
        const uploadResult = await uploadImages(data.images, "cars", newCarId);
        imageUrls = uploadResult.urls;
    }

    const carData = formToCar(data, newCarId, imageUrls);

    await setDoc(newCarRef, carData);
    return carData;
}