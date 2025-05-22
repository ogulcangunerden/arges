"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  const [debug, setDebug] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Log the filters being applied
        console.log("Filtering with category:", selectedCategory);
        console.log("Filtering with brand:", selectedBrand);

        setDebug(
          `Aranan kategori: "${selectedCategory}", Aranan marka: "${selectedBrand}"`
        );

        // Use the filtered function if either filter is applied
        if (selectedCategory || selectedBrand) {
          const data = await getFilteredProducts(
            selectedCategory,
            selectedBrand
          );
          console.log(`Found ${data.length} products with filters`);
          setProducts(data);
        } else {
          // Otherwise, fetch all products
          const data = await getProducts();
          console.log(`Found ${data.length} total products`);
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
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
          {debug && <p className="text-xs text-gray-400 mt-4">{debug}</p>}
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Logo watermark overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <img
              src="/arges-yazi.svg"
              alt="Logo Watermark"
              className="w-full h-full opacity-60"
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

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold truncate">{product.name}</h3>
        </div>

        <div className="mb-3">
          <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-2">
            {product.category}
          </span>
          {product.brand && (
            <div className="text-sm text-gray-500 mt-1">
              <span className="font-medium">Marka:</span> {product.brand}
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

        {product.features && product.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Özellikler:</h4>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              {product.features.slice(0, 2).map((feature, index) => (
                <li key={index} className="line-clamp-1">
                  {feature}
                </li>
              ))}
              {product.features.length > 2 && (
                <li className="text-blue-600">+ daha fazla</li>
              )}
            </ul>
          </div>
        )}

        <div className="mt-auto flex justify-end pt-4">
          <Link
            href={`/products/${product.id}`}
            className="bg-[#febd00] text-black hover:bg-[#e0a800] px-4 py-2 rounded text-sm font-medium transition-colors duration-300"
          >
            Detaylar
          </Link>
        </div>
      </div>
    </div>
  );
}
