import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/firebase/products";

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const product = await getProductById(params.productId);

  if (!product) {
    return {
      title: "Ürün Bulunamadı | Arges Makine",
    };
  }

  return {
    title: `${product.name} | Arges Makine`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProductById(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          href="/products"
          className=" text-[[#febd00]] inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Tüm Ürünlere Dön
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
          {product.imageUrl ? (
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-[#febd00] text-black hover:bg-[#e0a800] text-sm font-medium rounded-full">
                {product.category}
              </span>
              {product.brand && (
                <span className="inline-block px-3 py-1  bg-black  text-[#febd00] text-sm font-medium rounded-full">
                  {product.brand}
                </span>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Ürün Açıklaması</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Ürün Özellikleri</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium bg-[#febd00] text-black hover:bg-[#e0a800] rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
