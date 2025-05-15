import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative bg-background overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/hero-pattern.svg"
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              İş Makineleri İçin{" "}
              <span className="text-primary">Premium Yedek Parça</span>{" "}
              Çözümleri
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-md">
              Arges Makine olarak 20 yılı aşkın tecrübemizle iş makineleri için
              en kaliteli yedek parçaları sunuyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" passHref legacyBehavior>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Ürünlerimiz
                </Button>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  İletişime Geçin
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/20 p-2">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-muted-foreground text-sm">
                  Orijinal Ürün Garantisi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/20 p-2">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-muted-foreground text-sm">
                  Hızlı Teslimat
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/20 p-2">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-muted-foreground text-sm">
                  Teknik Destek
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary to-primary/70 opacity-30 blur-xl"></div>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                <Image
                  src="/images/machine.png"
                  alt="İş makinesi yedek parçaları"
                  width={600}
                  height={600}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
