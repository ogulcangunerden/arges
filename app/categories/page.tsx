import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getCategories } from "@/lib/firebase/categories";
import Script from "next/script";

export const metadata: Metadata = {
  title: "İş Makinaları Yedek Parça Kategorileri | Arges Makina",
  description:
    "Hidrolik pompalar, filtreler, motor parçaları ve daha fazlası. Tüm iş makinaları yedek parça kategorilerimizi keşfedin.",
  keywords:
    "iş makinesi kategoriler, hidrolik parçalar, filtreleme sistemleri, motor parçaları, şanzıman parçaları",
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    title: "İş Makineleri Yedek Parça Kategorileri | Arges Makine",
    description:
      "Tüm iş makinesi yedek parça kategorilerimizi inceleyin. En kaliteli parçalar Arges Makine güvencesiyle.",
    url: "https://argesmakine.com/categories",
    type: "website",
  },
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  // Create JSON-LD structured data for categories page
  const categoriesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: categories.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: category.name,
        description: category.description,
        url: `https://argesmakine.com/products?category=${encodeURIComponent(
          category.name
        )}`,
        image: `https://argesmakine.com${category.imageUrl}`,
      },
    })),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Script
        id="categories-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoriesJsonLd) }}
      />

      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Ürün Kategorilerimiz
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Tüm marka ve model iş makinaları için yüksek kaliteli yedek parçalar
          sunuyoruz. Geniş ürün yelpazemiz ile her ihtiyaca çözüm üretiyoruz.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group relative rounded-xl overflow-hidden bg-card border border-border transition-all hover:shadow-md"
            >
              <div className="aspect-square relative">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-300"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <h3 className="font-semibold text-xl text-white">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-sm text-zinc-200 mt-1">
                    {category.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-2">
              Kategoriler yükleniyor...
            </h3>
            <p className="text-muted-foreground">
              Lütfen biraz bekleyin veya daha sonra tekrar deneyin.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
