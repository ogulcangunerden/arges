"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts, getFilteredProducts } from "@/lib/firebase/products";
import { Product } from "@/types/product";

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
        console.error("Error fetching products:", err);
        setError("Ürünler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedBrand]);

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

  if (products.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {product.imageUrl ? (
        <div className="h-48 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
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

      <div className="p-6">
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

        <div className="mt-auto flex justify-end">
          <Link
            href={`/products/${product.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
          >
            Detaylar
          </Link>
        </div>
      </div>
    </div>
  );
}
