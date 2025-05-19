import {
  collection,
  getDocs,
  query,
  orderBy,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { Category } from "@/types/category";

const COLLECTION_NAME = "categories";

// Convert Firestore document to Category
export const convertFirestoreDocToCategory = (
  doc: DocumentSnapshot
): Category => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data?.name || "",
    imageUrl: data?.imageUrl || "",
    description: data?.description || "",
    order: data?.siralama || 0, // Using siralama field from Firebase
  };
};

// Get all categories ordered by siralama field (ascending)
export const getCategories = async (): Promise<Category[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("siralama", "asc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(convertFirestoreDocToCategory);
  } catch (error) {
    throw error;
  }
};
