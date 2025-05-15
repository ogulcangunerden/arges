import { Metadata } from "next";
import { products, categories, brands } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ürünlerimiz | Arges Makine",
  description:
    "Arges Makine - İş makineleri için yüksek kaliteli yedek parça ürünlerimiz",
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; brand?: string };
}) {
  const categoryId = searchParams.category;
  const brandId = searchParams.brand;

  const filteredProducts = products.filter((product) => {
    const matchesCategory = categoryId ? product.category === categoryId : true;
    const matchesBrand = brandId ? product.brand === brandId : true;
    return matchesCategory && matchesBrand;
  });

  const currentCategory = categoryId
    ? categories.find((cat) => cat.id === categoryId)
    : null;

  const currentBrand = brandId ? brands.find((b) => b.id === brandId) : null;

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          {currentCategory || currentBrand
            ? `${currentBrand?.name || ""} ${
                currentBrand && currentCategory ? " - " : ""
              } ${currentCategory?.name || ""}`
            : "Tüm Ürünlerimiz"}
        </h1>
        <p className="text-zinc-600 max-w-3xl">
          {currentCategory?.description ||
            (currentBrand
              ? `${currentBrand.name} marka ürünlerimizi keşfedin.`
              : "İş makineleriniz için yüksek kaliteli yedek parça ürünlerimizi keşfedin. Aradığınız parçayı kategorilere ve markalara göre filtreleyebilirsiniz.")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Kategoriler</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Link
                    href="/categories"
                    className={`text-sm hover:text-[#febd00] transition-colors ${
                      !categoryId ? "font-semibold text-[#febd00]" : ""
                    }`}
                  >
                    Tüm Kategoriler
                  </Link>
                </div>
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Link
                      href={
                        brandId
                          ? `/products?category=${category.id}&brand=${brandId}`
                          : `/products?category=${category.id}`
                      }
                      className={`text-sm hover:text-[#febd00] transition-colors ${
                        categoryId === category.id
                          ? "font-semibold text-[#febd00]"
                          : ""
                      }`}
                    >
                      {category.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Markalar</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Link
                    href="/brands"
                    className={`text-sm hover:text-[#febd00] transition-colors ${
                      !brandId ? "font-semibold text-[#febd00]" : ""
                    }`}
                  >
                    Tüm Markalar
                  </Link>
                </div>
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center">
                    <Link
                      href={
                        categoryId
                          ? `/products?category=${categoryId}&brand=${brand.id}`
                          : `/products?brand=${brand.id}`
                      }
                      className={`text-sm hover:text-[#febd00] transition-colors ${
                        brandId === brand.id
                          ? "font-semibold text-[#febd00]"
                          : ""
                      }`}
                    >
                      {brand.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  category={
                    categories.find((cat) => cat.id === product.category)
                      ?.name || ""
                  }
                  imageUrl={product.imageUrl}
                  slug={product.slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Ürün bulunamadı</h3>
              <p className="text-zinc-600">
                Seçtiğiniz kriterlere uygun ürün bulunmamaktadır.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
