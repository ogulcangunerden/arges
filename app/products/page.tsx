"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import ProductsList from "@/components/ProductsList";
import ProductFilterSidebar from "@/components/ProductFilterSidebar";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

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

  // Dynamic page title and meta updates based on filters
  useEffect(() => {
    let title = "İş Makinesi Yedek Parça Ürünlerimiz | Arges Makina";
    let description =
      "Caterpillar, Volvo, JCB, Komatsu ve diğer tüm marka iş makinaları için kaliteli yedek parçalar. Hidrolik sistemler, pompa, motor parçaları, filtreler ve geniş ürün yelpazemizle hizmetinizdeyiz.";

    if (decodedCategory && decodedBrand) {
      title = `${decodedBrand} ${decodedCategory} Yedek Parçaları | Arges Makina`;
      description = `${decodedBrand} marka ${decodedCategory} için en kaliteli yedek parçalar. Orijinal kalitede ${decodedBrand} ${decodedCategory} parçaları uygun fiyatlarla Arges Makina'da. Hızlı teslimat ve garanti ile.`;
    } else if (decodedCategory) {
      title = `${decodedCategory} Yedek Parçaları | İş Makinesi Parçaları | Arges Makina`;
      description = `${decodedCategory} için en kaliteli yedek parçalar. Tüm markalar için orijinal kalitede ${decodedCategory} parçaları uygun fiyatlarla. Profesyonel hizmet ve garanti ile Arges Makina'da.`;
    } else if (decodedBrand) {
      title = `${decodedBrand} Yedek Parçaları | ${decodedBrand} İş Makinesi Parçaları | Arges Makina`;
      description = `${decodedBrand} marka iş makinaları için en kaliteli yedek parçalar. Orijinal ${decodedBrand} parçaları, hidrolik sistemler, filtreler ve tüm yedek parçalar uygun fiyatlarla Arges Makina'da.`;
    }

    // Update document title and meta description dynamically
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }
  }, [decodedCategory, decodedBrand]);

  return (
    <>
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {decodedCategory && decodedBrand
              ? `${decodedBrand} ${decodedCategory} Ürünleri`
              : decodedCategory
              ? `${decodedCategory} Ürünleri`
              : decodedBrand
              ? `${decodedBrand} Ürünleri`
              : "Ürünlerimiz"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {decodedCategory || decodedBrand
              ? `${decodedBrand || ""} ${
                  decodedCategory || ""
                } için kaliteli yedek parça seçeneklerimizi keşfedin.`.trim()
              : "Geniş ürün yelpazemizi keşfedin ve ihtiyacınıza uygun çözümleri bulun."}
          </p>
        </div>
        <div className="hidden md:flex flex-col items-center">
          <Image
            src="/images/scf.jpeg"
            alt="scf"
            width={80}
            height={56}
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
  // JSON-LD structured data for product list page
  const productsListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "İş Makinası Yedek Parçaları",
        url: "https://argesismakinalari.com/products",
      },
    ],
    numberOfItems: 1,
  };

  // BreadcrumbList JSON-LD for better navigation SEO
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://argesismakinalari.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ürünler",
        item: "https://argesismakinalari.com/products",
      },
    ],
  };

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Structured data for products page */}
      <Script
        id="products-list-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsListJsonLd) }}
      />

      {/* Breadcrumb structured data */}
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
