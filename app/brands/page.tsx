import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBrands } from "@/lib/firebase/brands";
import { Brand } from "@/types/brand";

export const metadata: Metadata = {
  title: "Tüm Markalar | Arges Makine",
  description: "Arges Makine - İş makineleri yedek parça markaları",
};

async function fetchBrands(): Promise<Brand[]> {
  try {
    const brands = await getBrands();
    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export default async function BrandsPage() {
  const brands = await fetchBrands();

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
            <div className="aspect-square relative bg-white flex items-center justify-center p-4">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain p-4 transition-transform group-hover:scale-105 duration-300"
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
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
