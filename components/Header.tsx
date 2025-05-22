"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCategories } from "@/lib/firebase/categories";
import { getBrands } from "@/lib/firebase/brands";
import { Category } from "@/types/category";
import { Brand } from "@/types/brand";
//
type SubItem = {
  name: string;
  href: string;
};

type NavItem = {
  name: string;
  href: string;
  hasDropdown?: boolean;
  items?: SubItem[];
};

function buildNavItems(categories: Category[], brands: Brand[]): NavItem[] {
  return [
    { name: "Ana Sayfa", href: "/" },
    { name: "Tüm Ürünler", href: "/products" },
    {
      name: "Kategoriler",
      href: "/categories",
      hasDropdown: true,
      items: categories.map((category) => ({
        name: category.name,
        href: `/products?category=${encodeURIComponent(category.name)}`,
      })),
    },
    {
      name: "Markalar",
      href: "/brands",
      hasDropdown: true,
      items: brands.map((brand) => ({
        name: brand.name,
        href: `/products?brand=${encodeURIComponent(brand.name)}`,
      })),
    },
    { name: "Hakkımızda", href: "/about" },
    { name: "İletişim", href: "/contact" },
  ];
}

export function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [navItems, setNavItems] = useState<NavItem[]>([
    { name: "Ana Sayfa", href: "/" },
    { name: "Tüm Ürünler", href: "/products" },
    { name: "Kategoriler", href: "/categories" },
    { name: "Markalar", href: "/brands" },
    { name: "Hakkımızda", href: "/about" },
    { name: "İletişim", href: "/contact" },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          getCategories(),
          getBrands(),
        ]);

        setCategories(categoriesData);
        setBrands(brandsData);
        setNavItems(buildNavItems(categoriesData, brandsData));
      } catch (error) {
        console.error("Error fetching data for header:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Arges Logo"
            width={150}
            height={60}
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#febd00]">
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-52 p-2 rounded-md"
                >
                  <DropdownMenuItem
                    asChild
                    className="font-medium text-[#febd00]"
                  >
                    <Link href={item.href}>Tümünü Görüntüle</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1" />
                  {item.items?.map((subItem) => (
                    <DropdownMenuItem
                      key={subItem.href}
                      asChild
                      className="transition-colors hover:bg-zinc-100 hover:text-[#febd00] rounded"
                    >
                      <Link href={subItem.href}>{subItem.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-[#febd00]"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="default"
            className="hidden md:flex bg-[#febd00] hover:bg-[#e0a800] text-black"
          >
            <a
              href="https://wa.me/905394437905?text=Arges%20Makine%20%C3%BCr%C3%BCnleri%20hakk%C4%B1nda%20teklif%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
            >
              Teklif Al
            </a>
          </Button>

          {/* Mobile Navigation */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 p-2 rounded-md">
              <DropdownMenuItem
                asChild
                className="hover:bg-zinc-100 hover:text-[#febd00] rounded"
              >
                <Link href="/">Ana Sayfa</Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="hover:bg-zinc-100 hover:text-[#febd00] rounded"
              >
                <Link href="/products">Tüm Ürünler</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem className="font-semibold text-[#febd00]">
                Kategoriler
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="pl-6 hover:bg-zinc-100 hover:text-[#febd00] rounded"
              >
                <Link href="/categories">Tüm Kategoriler</Link>
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  asChild
                  className="pl-6 hover:bg-zinc-100 hover:text-[#febd00] rounded"
                >
                  <Link
                    href={`/products?category=${encodeURIComponent(
                      category.name
                    )}`}
                  >
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem className="font-semibold text-[#febd00]">
                Markalar
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="pl-6 hover:bg-zinc-100 hover:text-[#febd00] rounded"
              >
                <Link href="/brands">Tüm Markalar</Link>
              </DropdownMenuItem>
              {brands.map((brand) => (
                <DropdownMenuItem
                  key={brand.id}
                  asChild
                  className="pl-6 hover:bg-zinc-100 hover:text-[#febd00] rounded"
                >
                  <Link
                    href={`/products?brand=${encodeURIComponent(brand.name)}`}
                  >
                    {brand.name}
                  </Link>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                asChild
                className="hover:bg-zinc-100 hover:text-[#febd00] rounded"
              >
                <Link href="/about">Hakkımızda</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-zinc-100 hover:text-[#febd00] rounded"
              >
                <Link href="/contact">İletişim</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                asChild
                className="bg-[#febd00] text-black hover:bg-[#e0a800] rounded"
              >
                <a
                  href="https://wa.me/905394437905?text=Arges%20Makine%20%C3%BCr%C3%BCnleri%20hakk%C4%B1nda%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Teklif Al
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
