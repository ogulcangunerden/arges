"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, getFilteredProducts } from "@/lib/firebase/products";
import { Product } from "@/types/product";
import { useRouter, usePathname } from "next/navigation";
import { DocumentSnapshot } from "firebase/firestore";

interface ProductsListProps {
  selectedCategory?: string;
  selectedBrand?: string;
}

const PRODUCTS_PER_PAGE = 50;

export default function ProductsList({
  selectedCategory,
  selectedBrand,
}: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  // Track if an initial load is in progress to prevent duplicate calls
  const isLoadingRef = useRef<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const loadProducts = useCallback(
    async (isInitial: boolean = false) => {
      // Prevent duplicate loading calls
      if ((isInitial && isLoadingRef.current) || (!isInitial && loadingMore)) {
        return;
      }

      try {
        if (isInitial) {
          setLoading(true);
          isLoadingRef.current = true;
        } else {
          setLoadingMore(true);
        }

        // Use the filtered function if either filter is applied
        let result;
        if (selectedCategory || selectedBrand) {
          result = await getFilteredProducts(
            selectedCategory,
            selectedBrand,
            PRODUCTS_PER_PAGE,
            isInitial ? null : lastVisible
          );
        } else {
          // Otherwise, fetch all products
          result = await getProducts(
            PRODUCTS_PER_PAGE,
            isInitial ? null : lastVisible
          );
        }

        if (result.products.length === 0) {
          setHasMore(false);
        } else {
          setLastVisible(result.lastVisible);
          if (isInitial) {
            setProducts(result.products);
          } else {
            setProducts((prev) => [...prev, ...result.products]);
          }
          setHasMore(result.products.length === PRODUCTS_PER_PAGE);
        }
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error fetching products:", err);
        }
        setError("Ürünler yüklenirken bir hata oluştu.");
      } finally {
        if (isInitial) {
          setLoading(false);
          isLoadingRef.current = false;
        } else {
          setLoadingMore(false);
        }
      }
    },
    [selectedCategory, selectedBrand, lastVisible, loadingMore]
  );

  // Initial load of products
  useEffect(() => {
    // Reset state for new filter selections
    setHasMore(true);
    setLastVisible(null);
    setProducts([]);
    setError(null);

    // Load products with the new filters
    loadProducts(true);

    // Cleanup function
    return () => {
      isLoadingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedBrand]);

  // Setup intersection observer for infinite scroll
  useEffect(() => {
    if (loading || !hasMore) return;

    if (observer.current) observer.current.disconnect();

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (
        entries[0].isIntersecting &&
        hasMore &&
        !loadingMore &&
        !isLoadingRef.current
      ) {
        loadProducts();
      }
    };

    observer.current = new IntersectionObserver(callback, {
      rootMargin: "100px",
    });

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore, loadingMore, loadProducts]);

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
                aria-label={`Kategori filtresini kaldır: ${selectedCategory}`}
              >
                Kategori: {selectedCategory}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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
                aria-label={`Marka filtresini kaldır: ${selectedBrand}`}
              >
                Marka: {selectedBrand}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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

      {/* No products message */}
      {products.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <div className="text-gray-500 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Ürün Bulunamadı</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Aradığınız kriterlere uygun ürün bulunamadı. Lütfen filtrelerinizi
            değiştirin veya tüm ürünleri görüntüleyin.
          </p>
        </div>
      )}

      {/* Products grid */}
      {products.length > 0 && (
        <section aria-label="Ürün Listesi">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Loading more indicator */}
          <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
            {loadingMore && (
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            )}
            {!loadingMore && hasMore && (
              <div className="text-gray-500 text-sm">
                Daha fazla ürün yükleniyor...
              </div>
            )}
            {!hasMore && products.length > 0 && (
              <div className="text-gray-500 text-sm">
                Tüm ürünler gösteriliyor
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 group border h-full">
      <div className="relative aspect-square">
        <Image
          src={product.imageUrl || "/images/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover transition-all group-hover:scale-105 duration-300"
          priority={false}
          unoptimized={true}
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

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="inline-block text-xs font-medium text-[#febd00] bg-black px-2 py-1 rounded-full">
            {product.category || "Genel"}
          </span>
          {product.brand && (
            <span className="inline-block ml-2 text-xs font-medium text-[#febd00] bg-black px-2 py-1 rounded-full">
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
