import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, categories, brands } from "@/lib/data";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Ürün Bulunamadı | Arges Makine",
    };
  }

  return {
    title: `${product.title} | Arges Makine`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const category = categories.find((cat) => cat.id === product.category);
  const brand = brands.find((b) => b.id === product.brand);

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-4">
        <div className="flex items-center text-sm text-zinc-500 mb-6">
          <Link
            href="/products"
            className="hover:text-[#febd00] transition-colors"
          >
            Ürünler
          </Link>
          <span className="mx-2">/</span>
          {category && (
            <>
              <Link
                href={`/products?category=${category.id}`}
                className="hover:text-[#febd00] transition-colors"
              >
                {category.name}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-zinc-800">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="relative rounded-xl overflow-hidden bg-zinc-100">
            <div className="aspect-square">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {category && (
                  <Link
                    href={`/products?category=${category.id}`}
                    className="inline-block text-sm font-medium text-[#febd00] hover:underline"
                  >
                    {category.name}
                  </Link>
                )}
                {brand && (
                  <Link
                    href={`/products?brand=${brand.id}`}
                    className="inline-block text-sm font-medium text-zinc-600 hover:text-[#febd00] hover:underline"
                  >
                    {brand.name}
                  </Link>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                {product.title}
              </h1>
            </div>

            <p className="text-zinc-600">{product.description}</p>

            <div>
              <h2 className="text-xl font-semibold mb-3">Özellikler</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 rounded-full bg-[#febd00]/10 p-1 mt-0.5">
                      <svg
                        className="h-3 w-3 text-[#febd00]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-zinc-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Teknik Özellikler</h2>
              <div className="overflow-hidden rounded-lg border border-zinc-200">
                <table className="min-w-full divide-y divide-zinc-200">
                  <tbody className="divide-y divide-zinc-200">
                    {product.specifications.map((spec, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-zinc-50" : "bg-white"}
                      >
                        <td className="py-3 px-4 text-sm font-medium text-zinc-900">
                          {spec.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-zinc-600">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-[#febd00] hover:bg-[#e0a800] text-black w-full md:w-auto"
              >
                <Link href={`/contact?subject=Ürün Teklifi - ${product.title}`}>
                  Teklif Alın
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-8">İlgili Ürünler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* İlgili ürünler bileşeni buraya eklenebilir */}
        </div>
      </div>
    </div>
  );
}
