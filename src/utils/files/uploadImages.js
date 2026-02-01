import imageCompression from "browser-image-compression";

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../firebase/index.js";

export const uploadImages = async (files, folder, id) => {
    const uploadedRefs = [];

    try {
        const urls = await Promise.all(
            files.map(async (file, index) => {
                if (typeof file === 'string') return file;

                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                    fileType: "image/webp"
                };

                const compressedFile = await imageCompression(file, options);
                const fileName = `image_${index + 1}.webp`;
                const storageRef = ref(storage, `${folder}/${id}/${fileName}`);

                const snapshot = await uploadBytes(storageRef, compressedFile);
                uploadedRefs.push(storageRef);

                return await getDownloadURL(snapshot.ref);
            })
        );

        return { urls, uploadedRefs };
    } catch (error) {
        if (uploadedRefs.length) {
            await Promise.all(
                uploadedRefs.map(ref => deleteObject(ref).catch(() => {}))
            );
        }
        throw error;
    }
}