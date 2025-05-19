import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  where,
  DocumentSnapshot,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { Product } from "@/types/product";

const COLLECTION_NAME = "products";

// Convert Firestore document to Product
export const convertFirestoreDocToProduct = (
  doc: DocumentSnapshot
): Product => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data?.name,
    description: data?.description,
    category: data?.category,
    brand: data?.brand,
    price: data?.price,
    imageUrl: data?.imageUrl,
    features: data?.features || [],
    createdAt: data?.createdAt?.toDate(),
    updatedAt: data?.updatedAt?.toDate(),
  };
};

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(convertFirestoreDocToProduct);
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(convertFirestoreDocToProduct);
  } catch (error) {
    console.error("Error getting products by category:", error);
    throw error;
  }
};

// Get products filtered by both category and brand
export const getFilteredProducts = async (
  categoryName?: string,
  brandName?: string
): Promise<Product[]> => {
  try {
    const constraints: QueryConstraint[] = [];

    if (categoryName) {
      constraints.push(where("category", "==", categoryName));
    }

    if (brandName) {
      constraints.push(where("brand", "==", brandName));
    }

    constraints.push(orderBy("createdAt", "desc"));

    const q = query(collection(db, COLLECTION_NAME), ...constraints);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertFirestoreDocToProduct);
  } catch (error) {
    console.error("Error getting filtered products:", error);
    throw error;
  }
};

// Get a single product by ID
export const getProductById = async (
  productId: string
): Promise<Product | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return convertFirestoreDocToProduct(docSnap);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
};
