import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Ayna Mahruti - 068274 | Arges Makine",
  description: "068274 KOMATSU AYNA MAHRUTİ KOMATSU YEDEK PARÇA",
};

export default function AynaMahrutiPage() {
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
          <Link
            href={`/products?category=defransiyel`}
            className="hover:text-[#febd00] transition-colors"
          >
            Defransiyel
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-800">Ayna Mahruti - 068274</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="relative rounded-xl overflow-hidden bg-zinc-100">
            <div className="aspect-square">
              <Image
                src="/products/excavator-parts.jpg"
                alt="Ayna Mahruti - 068274"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-4">
                Ayna Mahruti - 068274
              </h1>

              <div className="bg-[#febd00]/10 p-4 rounded-lg border border-[#febd00]/20 mb-6">
                <p className="text-lg font-medium mb-2">Ürün Bilgileri</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Marka:</span>
                    <Link
                      href={`/products?brand=komatsu`}
                      className="text-[#febd00] hover:underline"
                    >
                      Komatsu
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Kategori:</span>
                    <Link
                      href={`/products?category=defransiyel`}
                      className="text-[#febd00] hover:underline"
                    >
                      Defransiyel
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Ürün Kodu:</span>
                    <span>068274</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Stok Durumu:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Var
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Ürün Açıklaması</h2>
              <p className="text-zinc-600 mb-6">
                068274 KOMATSU AYNA MAHRUTİ KOMATSU YEDEK PARÇA. Komatsu marka
                Ayna Mahruti - 068274 kodlu yedek parça. Tüm Komatsu yedek
                parçalarına sitemizden ulaşabilirsiniz.
              </p>
            </div>

            <div className="bg-zinc-50 p-5 rounded-lg border border-zinc-200 mb-6">
              <h3 className="text-lg font-medium mb-4 text-center">
                Hemen İletişime Geçin
              </h3>
              <div className="flex flex-col gap-4">
                <Button
                  size="lg"
                  className="bg-[#febd00] hover:bg-[#e0a800] text-black w-full gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <Link href={`tel:+905555555555`}>Hemen Arayın</Link>
                </Button>

                <Button variant="outline" size="lg" className="gap-2 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 text-green-600"
                  >
                    <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z"></path>
                  </svg>
                  <Link
                    href={`https://wa.me/+905555555555?text=Merhaba, Ayna Mahruti - 068274 ürünü hakkında detaylı bilgi almak istiyorum.`}
                  >
                    Whatsapp İle İletişim
                  </Link>
                </Button>

                <div className="text-center text-sm text-zinc-500 mt-2">
                  Sorularınız için 7/24 bize ulaşabilirsiniz
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
