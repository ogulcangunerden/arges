import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  startAfter,
  where,
  DocumentSnapshot,
  QueryConstraint,
  limit,
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
    degisenNo: data?.degisenNo,
    createdAt: data?.createdAt?.toDate(),
    updatedAt: data?.updatedAt?.toDate(),
  };
};

// Get all products with pagination
export const getProducts = async (
  pageSize = 50,
  startAfterDoc: DocumentSnapshot | null = null
): Promise<{ products: Product[]; lastVisible: DocumentSnapshot | null }> => {
  try {
    const constraints: QueryConstraint[] = [
      orderBy("createdAt", "desc"),
      limit(pageSize),
    ];

    // If we have a document to start after, add that constraint
    if (startAfterDoc) {
      constraints.push(startAfter(startAfterDoc));
    }

    const q = query(collection(db, COLLECTION_NAME), ...constraints);
    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map(convertFirestoreDocToProduct);

    // Get the last visible document for pagination
    const lastVisible =
      querySnapshot.docs.length > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1]
        : null;

    return { products, lastVisible };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error getting products:", error);
    }
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (
  category: string,
  pageSize = 50,
  startAfterDoc: DocumentSnapshot | null = null
): Promise<{ products: Product[]; lastVisible: DocumentSnapshot | null }> => {
  try {
    const constraints: QueryConstraint[] = [
      where("category", "==", category),
      orderBy("createdAt", "desc"),
      limit(pageSize),
    ];

    if (startAfterDoc) {
      constraints.push(startAfter(startAfterDoc));
    }

    const q = query(collection(db, COLLECTION_NAME), ...constraints);
    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map(convertFirestoreDocToProduct);

    // Get the last visible document for pagination
    const lastVisible =
      querySnapshot.docs.length > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1]
        : null;

    return { products, lastVisible };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error getting products by category:", error);
    }
    throw error;
  }
};

// Get products filtered by both category and brand
export const getFilteredProducts = async (
  categoryName?: string,
  brandName?: string,
  pageSize = 50,
  startAfterDoc: DocumentSnapshot | null = null
): Promise<{ products: Product[]; lastVisible: DocumentSnapshot | null }> => {
  try {
    const constraints: QueryConstraint[] = [];

    // Only add filters if they are defined and not empty strings
    if (categoryName && categoryName.trim() !== "") {
      constraints.push(where("category", "==", categoryName));
    }

    if (brandName && brandName.trim() !== "") {
      constraints.push(where("brand", "==", brandName));
    }

    // Always add these constraints
    constraints.push(orderBy("createdAt", "desc"));
    constraints.push(limit(pageSize));

    if (startAfterDoc) {
      constraints.push(startAfter(startAfterDoc));
    }

    const q = query(collection(db, COLLECTION_NAME), ...constraints);
    const querySnapshot = await getDocs(q);

    // Handle the case where the query returned no documents
    if (querySnapshot.empty) {
      return { products: [], lastVisible: null };
    }

    const products = querySnapshot.docs.map(convertFirestoreDocToProduct);

    // Get the last visible document for pagination
    const lastVisible =
      querySnapshot.docs.length > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1]
        : null;

    return { products, lastVisible };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error getting filtered products:", error);
    }
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
    if (process.env.NODE_ENV !== "production") {
      console.error("Error getting product:", error);
    }
    throw error;
  }
};
