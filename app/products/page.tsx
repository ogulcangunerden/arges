"use client";

import { Suspense, useState, useEffect } from "react";
import ProductsList from "@/components/ProductsList";
import ProductFilterSidebar from "@/components/ProductFilterSidebar";
import { useSearchParams } from "next/navigation";

// Separate component for handling search params
function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");

  // Decode URL parameters if they exist
  const decodedCategory = categoryParam
    ? decodeURIComponent(categoryParam)
    : undefined;
  const decodedBrand = brandParam ? decodeURIComponent(brandParam) : undefined;

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    decodedCategory
  );
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    decodedBrand
  );

  // Update state when URL params change
  useEffect(() => {
    setSelectedCategory(decodedCategory);
    setSelectedBrand(decodedBrand);
  }, [decodedCategory, decodedBrand]);

  return (
    <>
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Ürünlerimiz</h1>
          <p className="text-muted-foreground text-lg">
            Geniş ürün yelpazemizi keşfedin ve ihtiyacınıza uygun çözümleri
            bulun.
          </p>
        </div>
        <div className="hidden md:flex flex-col items-center">
          <img
            src="/images/scf.jpeg"
            alt="scf"
            className="h-14 object-contain"
          />
          <span className="text-sm font-medium mt-1">Yetkili Bayisidir</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <ProductFilterSidebar
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            onCategoryChange={setSelectedCategory}
            onBrandChange={setSelectedBrand}
          />
        </aside>

        {/* Products List */}
        <div className="flex-1">
          <Suspense fallback={<ProductsLoadingSkeleton />}>
            <ProductsList
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Suspense fallback={<PageLoadingSkeleton />}>
        <ProductsContent />
      </Suspense>
    </main>
  );
}

function PageLoadingSkeleton() {
  return (
    <>
      <div className="mb-10">
        <div className="h-10 bg-muted rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="h-6 bg-muted rounded w-2/3 animate-pulse"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="h-96 bg-muted rounded animate-pulse"></div>
        </aside>
        <div className="flex-1">
          <ProductsLoadingSkeleton />
        </div>
      </div>
    </>
  );
}

function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-muted"></div>
          <div className="p-6">
            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-5/6 mb-4"></div>
            <div className="flex justify-between mt-4">
              <div className="h-6 bg-muted rounded w-1/4"></div>
              <div className="h-8 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
