import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getDocumentById = async (collectionName, docId) => {
    const documentRef = doc(db, collectionName, docId);
    const snapshot = await getDoc(documentRef);

    if (!snapshot.exists()) {
        throw new Error("Car not found");
    }

    return {
        id: snapshot.id,
        ...snapshot.data()
    }
}