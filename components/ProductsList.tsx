"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, getFilteredProducts } from "@/lib/firebase/products";
import { Product } from "@/types/product";
import { useRouter, usePathname } from "next/navigation";
import ReactPaginate from "react-paginate";

interface ProductsListProps {
  selectedCategory?: string;
  selectedBrand?: string;
}

const PRODUCTS_PER_PAGE = 18;

export default function ProductsList({
  selectedCategory,
  selectedBrand,
}: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      // Use the filtered function if either filter is applied
      let result;
      if (selectedCategory || selectedBrand) {
        result = await getFilteredProducts(
          selectedCategory,
          selectedBrand,
          1000 // Fetch more initially to calculate pages
        );
      } else {
        // Otherwise, fetch all products
        result = await getProducts(1000);
      }

      setAllProducts(result.products);
      setTotalPages(Math.ceil(result.products.length / PRODUCTS_PER_PAGE));

      // Set the initial page of products
      const initialProducts = result.products.slice(0, PRODUCTS_PER_PAGE);
      setProducts(initialProducts);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error fetching products:", err);
      }
      setError("Ürünler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedBrand]);

  // Initial load of products
  useEffect(() => {
    // Reset state for new filter selections
    setProducts([]);
    setAllProducts([]);
    setCurrentPage(0);
    setError(null);

    // Important: Reset loading state to ensure UI shows loading indicator
    setLoading(true);

    // Load products with the new filters
    loadProducts();
  }, [selectedCategory, selectedBrand, loadProducts]);

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    const startOffset = selected * PRODUCTS_PER_PAGE;
    const endOffset = startOffset + PRODUCTS_PER_PAGE;
    setProducts(allProducts.slice(startOffset, endOffset));

    // Scroll to top when changing pages
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to remove category filter
  const handleRemoveCategory = () => {
    // Reset products state first to ensure clean slate
    setProducts([]);
    setCurrentPage(0);

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
    // Reset products state first to ensure clean slate
    setProducts([]);
    setCurrentPage(0);

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
            {allProducts.length} ürün bulundu
          </p>
        </div>
      )}

      {/* No products message */}
      {allProducts.length === 0 && (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <ReactPaginate
                breakLabel="..."
                nextLabel="İleri &raquo;"
                onPageChange={handlePageChange}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="&laquo; Geri"
                renderOnZeroPageCount={null}
                forcePage={currentPage}
                containerClassName="flex justify-center items-center list-none"
                pageLinkClassName="px-4 py-2 mx-1 rounded-md border hover:bg-gray-100 transition-colors"
                previousLinkClassName="px-4 py-2 mx-1 rounded-md border hover:bg-gray-100 transition-colors"
                nextLinkClassName="px-4 py-2 mx-1 rounded-md border hover:bg-gray-100 transition-colors"
                activeLinkClassName="bg-[#febd00] text-white border-[#febd00] hover:bg-[#febd00]"
                disabledLinkClassName="cursor-not-allowed opacity-50"
                breakLinkClassName="px-4 py-2 mx-1"
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  // Create a rich SEO-friendly alt text that includes product name and part number
  const altText = `${product.name}${
    product.degisenNo ? ` - ${product.degisenNo}` : ""
  } - ${product.brand || ""} ${
    product.category || ""
  } yedek parça - Arges Makina`;

  // Create a title attribute that includes product name and part number
  const titleText = `${product.name}${
    product.degisenNo ? ` (${product.degisenNo})` : ""
  } - ${product.category || "Yedek Parça"} - Arges Makina`;

  return (
    <div
      className="card overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 group border h-full"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="relative aspect-square">
        <Image
          src={product.imageUrl || "/images/placeholder.png"}
          alt={altText}
          title={titleText}
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
          <span
            className="inline-block text-xs font-medium text-[#febd00] bg-black px-2 py-1 rounded-full"
            itemProp="category"
          >
            {product.category || "Genel"}
          </span>
          {product.brand && (
            <span
              className="inline-block ml-2 text-xs font-medium text-[#febd00] bg-black px-2 py-1 rounded-full"
              itemProp="brand"
              itemScope
              itemType="https://schema.org/Brand"
            >
              <meta itemProp="name" content={product.brand} />
              {product.brand}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold mb-2 text-gray-800" itemProp="name">
          {product.degisenNo ? <>{product.name} </> : product.name}
        </h3>

        <p
          className="text-sm text-gray-500 mb-2 line-clamp-3"
          itemProp="description"
        >
          {product.description}
        </p>

        {product.degisenNo && (
          <p className="text-sm text-gray-500 mb-4 flex-grow">
            <span className="font-medium">Değişen No:</span>{" "}
            <span itemProp="sku">{product.degisenNo}</span>
            <meta itemProp="mpn" content={product.degisenNo} />
          </p>
        )}

        <Link
          href={`/products/${product.id}`}
          className="mt-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#febd00] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          title={titleText}
          itemProp="url"
        >
          Detayları Gör
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>

        {/* Add hidden structured data elements for SEO */}
        <div style={{ display: "none" }}>
          <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta
              itemProp="availability"
              content="https://schema.org/InStock"
            />
            <span
              itemProp="seller"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <meta itemProp="name" content="Arges Makina" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
