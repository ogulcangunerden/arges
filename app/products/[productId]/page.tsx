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
            <a
              href={`https://wa.me/905394437905?text=${encodeURIComponent(
                `${product.name} ürünü hakkında bilgi almak istiyorum.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium bg-[#febd00] text-black hover:bg-[#e0a800] rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#febd00]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp ile İletişime Geç
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
