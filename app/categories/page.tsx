import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tüm Kategoriler | Arges Makine",
  description: "Arges Makine - İş makineleri yedek parça kategorileri",
};

// Kategori görselleri - isteğe göre kolayca düzenlenebilir
const categoryVisuals = [
  {
    id: "yuruyus-alt-takim",
    name: "Yürüyüş ve Alt Takım",
    image: "/categories/yuruyen.png",
    description: "Yürüyüş ve alt takım parçaları",
  },
  {
    id: "motor-mekanik",
    name: "Motor ve Mekanik Parçalar",
    image: "/categories/mekanik.webp",
    description: "Motor ve mekanik parçalar",
  },
  {
    id: "hidrolik",
    name: "Hidrolik Sistem Parçaları",
    image: "/categories/hidrolik.jpg",
    description: "Hidrolik sistem parçaları",
  },
  {
    id: "kazici-delici-grubu",
    name: "Kazıcı ve Delici Grup",
    image: "/categories/delici.webp",
    description: "Kazıcı ve delici grup parçaları",
  },
  {
    id: "sanziman",
    name: "Şanzıman Parçaları",
    image: "/categories/transmission.webp",
    description: "Şanzıman ve aktarma organları",
  },
  {
    id: "tirnak",
    name: "Tırnak Grupları",
    image: "/categories/tirnak.jpg",
    description: "Kova tırnakları ve bağlantı elemanları",
  },
  {
    id: "digerleri",
    name: "Diğer Parçalar",
    image: "/brands/other.svg",
    description: "Diğer yedek parçalar",
  },
];

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

      {/* Kategori Listesi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categoryVisuals.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group relative rounded-xl overflow-hidden bg-card border border-border transition-all hover:shadow-md"
          >
            <div className="aspect-square relative">
              <Image
                src={category.image}
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
