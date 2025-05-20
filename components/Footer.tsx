"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { getCategories } from "@/lib/firebase/categories";
import { getBrands } from "@/lib/firebase/brands";
import { Category } from "@/types/category";
import { Brand } from "@/types/brand";

export function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [year, setYear] = useState<number>(2024); // Fallback default

  useEffect(() => {
    // Update the year on the client
    setYear(new Date().getFullYear());

    // Fetch data
    const fetchData = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          getCategories(),
          getBrands(),
        ]);

        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching data for footer:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-card border-t border-border text-foreground py-12">
      <div className=" px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Arges Logo"
                width={150}
                height={60}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Arges, iş makineleri için yüksek kaliteli yedek parça tedariğinde
              sektörün lider kuruluşudur.
            </p>
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
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${encodeURIComponent(
                      category.name
                    )}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              {categories.length > 6 && (
                <li>
                  <Link
                    href="/products"
                    className="text-primary font-medium hover:underline"
                  >
                    Tümünü Gör
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Markalar
            </h3>
            <ul className="space-y-2 text-sm">
              {brands.slice(0, 6).map((brand) => (
                <li key={brand.id}>
                  <Link
                    href={`/products?brand=${encodeURIComponent(brand.name)}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
              {brands.length > 6 && (
                <li>
                  <Link
                    href="/brands"
                    className="text-primary font-medium hover:underline"
                  >
                    Tümünü Gör
                  </Link>
                </li>
              )}
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
                  İkitelli OSB, Sefaköy San. Sit. 15. Blok No:26
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <Link
                  href="tel:+902125490586"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  +90 212 549 05 86
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <Link
                  href="mailto:muzafferarslan05@hotmail.com"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  muzafferarslan05@hotmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Arges Makine. Tüm hakları saklıdır.
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
