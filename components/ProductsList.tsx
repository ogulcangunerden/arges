"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, getFilteredProducts } from "@/lib/firebase/products";
import { Product } from "@/types/product";
import { useRouter, usePathname } from "next/navigation";

interface ProductsListProps {
  selectedCategory?: string;
  selectedBrand?: string;
}

export default function ProductsList({
  selectedCategory,
  selectedBrand,
}: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Use the filtered function if either filter is applied
        if (selectedCategory || selectedBrand) {
          const data = await getFilteredProducts(
            selectedCategory,
            selectedBrand
          );
          setProducts(data);
        } else {
          // Otherwise, fetch all products
          const data = await getProducts();
          setProducts(data);
        }
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error fetching products:", err);
        }
        setError("Ürünler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedBrand]);

  // Function to remove category filter
  const handleRemoveCategory = () => {
    if (selectedBrand) {
      // If brand filter exists, keep it and remove only category
      router.push(`${pathname}?brand=${encodeURIComponent(selectedBrand)}`);
    } else {
      // If no brand filter, clear all filters
      router.push(pathname);
    }
  };

  // Function to remove brand filter
  const handleRemoveBrand = () => {
    if (selectedCategory) {
      // If category filter exists, keep it and remove only brand
      router.push(
        `${pathname}?category=${encodeURIComponent(selectedCategory)}`
      );
    } else {
      // If no category filter, clear all filters
      router.push(pathname);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Bir hata oluştu</h3>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Display active filters regardless of whether products are found */}
      {(selectedCategory || selectedBrand) && (
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Filtrelenmiş Ürünler</h2>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <button
                onClick={handleRemoveCategory}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors"
              >
                Kategori: {selectedCategory}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            {selectedBrand && (
              <button
                onClick={handleRemoveBrand}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors"
              >
                Marka: {selectedBrand}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {products.length} ürün bulundu
          </p>
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-yellow-500 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {selectedCategory || selectedBrand
              ? "Seçilen filtrelerle ürün bulunamadı"
              : "Henüz ürün yok"}
          </h3>
          <p className="text-gray-500">
            {selectedCategory || selectedBrand
              ? "Lütfen farklı filtreler deneyin."
              : "Yakında ürünlerimiz eklenecektir."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {product.imageUrl ? (
        <div className="h-48 overflow-hidden relative">
          {/* Product image */}
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Logo watermark overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <Image
              src="/arges-yazi.svg"
              alt="Logo Watermark"
              fill
              className="opacity-60"
            />
          </div>
        </div>
      ) : (
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {product.category || "Genel"}
          </span>
          {product.brand && (
            <span className="inline-block ml-2 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
              {product.brand}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold mb-2 text-gray-800">{product.name}</h3>

        <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-grow">
          {product.description}
        </p>

        <Link
          href={`/products/${product.id}`}
          className="mt-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#febd00] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Detayları Gör
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
