import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import {
    uploadImages,
    deleteImages,
    getCarObject
} from "../../utils";

export const updateCar = async (carId, data, originalImages = []) => {
    const currentImages = data.images || [];

    const retainedImages = currentImages.filter(img => typeof img === 'string');

    const newFiles = currentImages.filter(img => img instanceof File);

    const removedImages = originalImages.filter(url => !retainedImages.includes(url));
    if (removedImages.length > 0)  await deleteImages(removedImages);

    let finalImages = [...retainedImages];

    if (newFiles.length > 0) {
        const uploadResult = await uploadImages(newFiles, "cars", carId);
        finalImages = [...finalImages, ...uploadResult.urls];
    }

    const carData = getCarObject(data, carId, finalImages);

    Object.keys(carData).forEach(key => carData[key] === undefined && delete carData[key]);

    const carRef = doc(db, "cars", carId);
    await updateDoc(carRef, carData);

    return carData;
}