import Image from "next/image";
import Link from "next/link";

// Select a subset of categories to display in the featured section
const featuredCategories = [
  {
    id: "yuruyus-alt-takim",
    name: "Yürüyüş Alt Takım",
    imageUrl: "/images/yuruyus-alt-takim.jpg",
    description:
      "Paletli iş makineleri için yürüyüş takımları ve alt şase parçaları",
  },
  {
    id: "motor-mekanik",
    name: "Motor Mekanik",
    imageUrl: "/images/motor-mekanik.jpg",
    description: "Motor ve mekanik aksamlar için yedek parçalar",
  },
  {
    id: "hidrolik",
    name: "Hidrolik",
    imageUrl: "/images/hidrolik.jpg",
    description: "Yüksek kaliteli hidrolik sistem komponentleri",
  },
  {
    id: "kazici-delici-grubu",
    name: "Kazıcı Delici Grubu",
    imageUrl: "/images/kazici-delici.jpg",
    description: "Kazıcı ve delici ekipmanlar için yedek parçalar",
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-background">
      <div>
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ürün Kategorilerimiz
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Tüm marka ve model iş makineleri için yüksek kaliteli yedek parçalar
            sunuyoruz. Geniş ürün yelpazemiz ile her ihtiyaca çözüm üretiyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative rounded-xl overflow-hidden bg-card border border-border transition-all hover:shadow-md"
            >
              <div className="aspect-square relative">
                <Image
                  src={category.imageUrl}
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
