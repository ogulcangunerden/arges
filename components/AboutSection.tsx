import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden">
              <Image
                src="/about-image.jpg"
                alt="Arges Makine İş Makineleri Yedek Parça"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                İş Makineleri Yedek Parçaları&apos;nda{" "}
                <span className="text-primary">Güvenilir Çözüm Ortağınız</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Arges Makine olarak, 20 yılı aşkın sektör tecrübemizle iş
                makineleri için yedek parça tedariğinde sektörün lider
                kuruluşları arasında yer alıyoruz. Müşteri memnuniyetini her
                zaman ön planda tutarak, kaliteli ürünleri rekabetçi fiyatlarla
                sunmaya devam ediyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="mr-4 rounded-full bg-primary/10 p-3">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Kalite Garantisi</h3>
                  <p className="text-sm text-muted-foreground">
                    Tüm ürünlerimiz kalite kontrol süreçlerinden
                    geçirilmektedir.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 rounded-full bg-primary/10 p-3">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Hızlı Teslimat</h3>
                  <p className="text-sm text-muted-foreground">
                    Geniş stok ağımız ile ihtiyaçlarınıza hızlı çözüm sunuyoruz.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 rounded-full bg-primary/10 p-3">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Teknik Destek</h3>
                  <p className="text-sm text-muted-foreground">
                    Uzman ekibimiz tüm teknik sorularınızda yanınızda.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 rounded-full bg-primary/10 p-3">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Profesyonel Ekip</h3>
                  <p className="text-sm text-muted-foreground">
                    Alanında uzman kadromuz ile her zaman yanınızdayız.
                  </p>
                </div>
              </div>
            </div>

            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
            >
              <Link href="/about">Daha Fazla Bilgi</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
