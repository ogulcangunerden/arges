import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/data";

export function BrandShowcase() {
  return (
    <section className="py-16 bg-zinc-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Temsil Ettiğimiz Markalar
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Dünya&apos;nın önde gelen iş makinesi ve motor üreticilerinin
            orijinal ve eşdeğer yedek parçalarını temin ediyoruz.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/products?brand=${brand.id}`}
              className="group flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-border hover:shadow-md transition-all"
            >
              <div className="h-24 w-full relative flex items-center justify-center mb-3 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={120}
                  height={80}
                  className="object-contain transition-opacity group-hover:opacity-80"
                  unoptimized={true}
                />
              </div>
              <span className="text-sm font-medium text-center">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/brands"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#febd00] hover:bg-[#e0a800] transition-colors"
          >
            Tüm Markalarımızı Görüntüle
          </Link>
        </div>
      </div>
    </section>
  );
}
