import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border text-foreground py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Arges Logo"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Arges, iş makineleri için yüksek kaliteli yedek parça tedariğinde
              sektörün lider kuruluşudur.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Hızlı Linkler
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Ürünlerimiz
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Ürün Kategorileri
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=motor"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Motor Parçaları
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=hidrolik"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Hidrolik Sistemler
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=filtreler"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Filtreler
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=yuruyus"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Yürüyüş Takımları
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              İletişim
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="text-foreground">
                  İstanbul Yolu 35. km No:244, Ankara, Türkiye
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <Link
                  href="tel:+903122222222"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  +90 312 222 22 22
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <Link
                  href="mailto:info@argesmakine.com"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  info@argesmakine.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Arges Makine. Tüm hakları
            saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
