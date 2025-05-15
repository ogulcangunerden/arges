import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tüm Kategoriler | Arges Makine",
  description: "Arges Makine - İş makineleri yedek parça kategorileri",
};

// Category image paths mapping
const categoryImages: Record<string, string> = {
  "yuruyus-alt-takim": "/images/yuruyus-alt-takim.jpg",
  "motor-mekanik": "/images/motor-mekanik.jpg",
  hidrolik: "/images/hidrolik.jpg",
  "kazici-delici-grubu": "/images/kazici-delici.jpg",
  sanziman: "/images/sanziman.jpg", // Add default image path if not exists
  defransiyel: "/images/defransiyel.jpg", // Add default image path if not exists
  tirnak: "/images/tirnak.jpg", // Add default image path if not exists
  digerleri: "/images/digerleri.jpg", // Add default image path if not exists
};

export default function CategoriesPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Tüm Kategoriler
        </h1>
        <p className="text-zinc-600 max-w-3xl">
          İş makineleriniz için tüm kategorilerimizi keşfedin. Yüksek kaliteli
          yedek parçalarımız ile makinelerinizin performansını artırın.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group relative rounded-xl overflow-hidden bg-card border border-border transition-all hover:shadow-md"
          >
            <div className="aspect-square relative">
              <Image
                src={
                  categoryImages[category.id] || "/images/default-category.jpg"
                }
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 w-full p-4 text-white">
              <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
              <p className="text-sm text-zinc-200 opacity-90">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
