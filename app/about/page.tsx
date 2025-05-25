import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda | Arges Makine",
  description:
    "Arges Makina - İş makinaları için yedek parça tedarikinde sektörün lider kuruluşu",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#0f0f0f] py-16 md:py-24">
        <div className="px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              İş Makineleri Yedek Parça Sektöründe{" "}
              <span className="text-[#febd00]">20 Yıllık Tecrübe</span>
            </h1>
            <p className="text-zinc-400 md:text-lg mb-8">
              ARGES İş Makinaları Yedek Parçaları 20 yılı aşkın tecrübesi ile
              dünyanın en büyük iş makinaları üreticilerinin orijinal ve OEM
              yedek parçalarını siz değerli müşterilerimize sunmakta olan
              sektörümüzün lokomotif şirketlerinde edinmiş olduğumuz tecrübe,
              deneyim ve bilgiyi paylaşmak için kurulmuştur.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden rounded-2xl h-auto">
              <Image
                src="/images/arges-dukkan.jpeg"
                alt="Arges Makine Şirket Görünümü"
                width={1000}
                height={750}
                className="object-contain w-full h-auto"
                priority
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Hikayemiz</h2>
              <div className="space-y-4 text-zinc-600">
                <p>
                  Arges Makine, 2011 yılında iş makinaları için yedek parça
                  tedarik etmek amacıyla kurulmuştur. Şirketimiz, kalite, uygun
                  fiyat, satış öncesi ve sonrası teknik destek, zamanında teslim
                  ve müşteri memnuniyetini ilke edinmiştir.
                </p>
                <p>
                  Kazıcı-delici, alt takım grupları, motor ekipmanları,
                  şanzıman-cer grubu, hidrolik ekipmanlar, fren sistemleri,
                  elektrik malzemeleri, filtre, enjektör ve geniş ürün yelpazesi
                  ile iş makinalarının her türlü orijinal ve yan sanayi yedek
                  parça ihtiyaçlarını karşılamaktayız.
                </p>
                <p>
                  Firmamız bünyesinde çalışan alanında uzman personellerimizin
                  satış esnasında ve sonrasında gerekli kontrolleri yapması ile
                  malzemenin çalışma şartları ve istenilen kalite korunması ve
                  arttırılması birinci ilkemizdir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-zinc-50">
        <div className="px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Misyon ve Vizyonumuz</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Sektördeki konumumuzu güçlendirmek ve müşterilerimize en iyi
              hizmeti sunmak için çalışıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="rounded-full bg-[#febd00]/10 p-3 inline-block mb-6">
                <svg
                  className="h-6 w-6 text-[#febd00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Misyonumuz</h3>
              <p className="text-zinc-600">
                Orijinal ve yan sanayi yedek parçaları kaliteli, uygun fiyatlı
                ve zamanında tedarik ederek, satış öncesi ve sonrası teknik
                destek ile müşteri memnuniyetini en üst seviyede tutmak.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="rounded-full bg-[#febd00]/10 p-3 inline-block mb-6">
                <svg
                  className="h-6 w-6 text-[#febd00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Vizyonumuz</h3>
              <p className="text-zinc-600">
                Türkiye&apos;de ve bölge ülkelerinde iş makinaları yedek parça
                sektöründe lider konuma gelmek, alanında uzman kadromuzla ürün
                kalitesini koruyarak ve geliştirerek sektörde güvenilir bir
                marka olmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f0f0f] py-16">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-3xl font-bold text-white">
                Sizinle Çalışmaya Hazırız
              </h2>
              <p className="text-zinc-400">
                İş makineleriniz için yedek parça ihtiyaçlarınızda yanınızdayız.
                Hemen iletişime geçin.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-[#febd00] hover:bg-[#e0a800] text-black mt-4"
            >
              <Link href="/contact">İletişime Geç</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
