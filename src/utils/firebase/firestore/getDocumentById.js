import { doc, getDoc } from "firebase/firestore";

import { db } from "../../../firebase/index.js";

import { assert } from "../../index.js";

export const getDocumentById = async (collectionName, docId) => {
    const documentRef = doc(db, collectionName, docId);
    const snapshot = await getDoc(documentRef);

    assert(snapshot.exists(), "Запис не знайдено!");

    return {
        id: snapshot.id,
        ...snapshot.data()
    }
}