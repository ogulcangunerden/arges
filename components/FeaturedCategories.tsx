import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/firebase/categories";
import { Category } from "@/types/category";

async function fetchCategories(): Promise<Category[]> {
  try {
    const allCategories = await getCategories();
    // Only show the first 8 categories in the featured section
    return allCategories.slice(0, 8);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function FeaturedCategories() {
  const featuredCategories = await fetchCategories();

  return (
    <section className="py-16 bg-zinc-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ürün Kategorilerimiz
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Tüm marka ve model iş makineleri için yüksek kaliteli yedek parçalar
            sunuyoruz. Geniş ürün yelpazemiz ile her ihtiyaca çözüm üretiyoruz.
          </p>
        </div>

        {featuredCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group flex flex-col bg-white rounded-lg border border-border hover:shadow-md transition-all overflow-hidden"
              >
                <div className="h-48 w-full relative flex items-center justify-center bg-gray-100 overflow-hidden">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                    unoptimized={true}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Kategoriler yükleniyor...</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#febd00] hover:bg-[#e0a800] transition-colors"
          >
            Tüm Kategorilerimizi Görüntüle
          </Link>
        </div>
      </div>
    </section>
  );
}
