import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tüm Markalar | Arges Makine",
  description: "Arges Makine - İş makineleri yedek parça markaları",
};

export default function BrandsPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Tüm Markalar</h1>
        <p className="text-zinc-600 max-w-3xl">
          İş makineleriniz için tüm markalarımızı keşfedin. Yüksek kaliteli
          yedek parçalarımız ile makinelerinizin performansını artırın.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/products?brand=${brand.id}`}
            className="group relative rounded-xl overflow-hidden bg-card border border-border transition-all hover:shadow-md"
          >
            <div className="aspect-square relative">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 w-full p-4 text-white">
              <h3 className="font-semibold text-lg mb-1">{brand.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
