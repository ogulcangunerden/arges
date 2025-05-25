import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="bg-primary/10 py-16 md:py-20">
      <div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              İşinizi Sorunsuz Sürdürmeniz İçin Yanınızdayız
            </h2>
            <p className="text-muted-foreground md:text-lg">
              İş makinalarınızın ihtiyacı olan yedek parçalar için teklif almak
              ve daha detaylı bilgi edinmek için hemen bizimle iletişime geçin.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="/contact">Teklif Alın</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Link href="/products">Ürünleri İnceleyin</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
