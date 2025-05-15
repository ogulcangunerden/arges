import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/data";

export function BrandShowcase() {
  return (
    <section className="py-16 bg-zinc-50">
      <div className="container px-4 md:px-6">
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
              className="group flex items-center justify-center p-4 bg-white rounded-lg border border-border hover:shadow-md transition-all"
            >
              <div className="h-16 relative flex items-center justify-center">
                <Image
                  src={`/brands/${brand.id}.png`}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="object-contain transition-opacity group-hover:opacity-80"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
