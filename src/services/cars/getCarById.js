import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getCarById = async (carId) => {
    const carRef = doc(db, "cars", carId);
    const snapshot = await getDoc(carRef);

    if (!snapshot.exists()) {
        throw new Error("Car not found");
    }

    return {
        id: snapshot.id,
        ...snapshot.data()
    }
}
