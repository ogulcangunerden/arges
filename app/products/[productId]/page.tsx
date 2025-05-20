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
    <main className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-8">
        <Link
          href="/products"
          className="text-[#febd00] hover:text-[#e0a800] transition-colors duration-300 inline-flex items-center font-medium"
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
            className="mr-2 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Tüm Ürünlere Dön
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Image */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
          {product.imageUrl ? (
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain transform transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          ) : (
            <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-gray-300"
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
        <div className="space-y-8">
          <div className="border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">
              {product.name}
            </h1>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 flex items-center">
              <span className="w-1.5 h-5 bg-[#febd00] rounded-full mr-2 inline-block"></span>
              Ürün Grubu
            </h2>
            <p className="text-gray-700 whitespace-pre-line pl-4">
              {product.category}
            </p>
          </div>

          {product.brand && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 flex items-center">
                <span className="w-1.5 h-5 bg-[#febd00] rounded-full mr-2 inline-block"></span>
                Ürün Markası
              </h2>
              <p className="text-gray-700 whitespace-pre-line pl-4">
                {product.brand}
              </p>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 flex items-center">
              <span className="w-1.5 h-5 bg-[#febd00] rounded-full mr-2 inline-block"></span>
              Ürün Açıklaması
            </h2>
            <p className="text-gray-700 whitespace-pre-line pl-4">
              {product.description}
            </p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                <span className="w-1.5 h-5 bg-[#febd00] rounded-full mr-2 inline-block"></span>
                Ürün Özellikleri
              </h2>
              <ul className="space-y-3 pl-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#febd00] mr-3 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
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
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium bg-[#febd00] text-black hover:bg-[#e0a800] rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#febd00]"
            >
              İletişime Geç
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
