import {
  collection,
  getDocs,
  query,
  orderBy,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { Brand } from "@/types/brand";

const COLLECTION_NAME = "brands";

// Convert Firestore document to Brand
export const convertFirestoreDocToBrand = (doc: DocumentSnapshot): Brand => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data?.name || "",
    image: data?.imageUrl || "", // Using imageUrl field from Firebase
    order: data?.siralama || 0, // Using siralama field from Firebase
  };
};

// Get all brands ordered by siralama field (ascending)
export const getBrands = async (): Promise<Brand[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("siralama", "asc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(convertFirestoreDocToBrand);
  } catch (error) {
    throw error;
  }
};
