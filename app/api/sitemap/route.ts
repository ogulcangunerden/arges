import { NextResponse } from "next/server";
import { getProducts } from "@/lib/firebase/products";
import { getCategories } from "@/lib/firebase/categories";
import { getBrands } from "@/lib/firebase/brands";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { Brand } from "@/types/brand";

export async function GET() {
  try {
    // Fetch products, categories, and brands
    const productsResult = await getProducts(2000); // Increased limit for better coverage
    const products = productsResult.products;
    const categories = await getCategories();
    const brands = await getBrands();

    // Start XML string with enhanced structure
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://argesismakinalari.com/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://argesismakinalari.com/products</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://argesismakinalari.com/categories</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://argesismakinalari.com/brands</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://argesismakinalari.com/about</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://argesismakinalari.com/contact</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

    // Add all products with enhanced metadata and image information
    if (products && products.length) {
      products.forEach((product: Product) => {
        // Determine last modified date
        const lastModified = new Date(
          product.updatedAt || product.createdAt || new Date()
        )
          .toISOString()
          .split("T")[0];

        xml += `
  <url>
    <loc>https://argesismakinalari.com/products/${product.id}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;

        // Add image sitemap information if product has an image
        if (product.imageUrl && product.imageUrl !== "/logo.svg") {
          xml += `
    <image:image>
      <image:loc>${product.imageUrl}</image:loc>
      <image:caption>${product.name}${
            product.degisenNo ? ` (${product.degisenNo})` : ""
          } - ${product.brand || ""} ${
            product.category || "Yedek Parça"
          }</image:caption>
      <image:title>${product.name}${
            product.degisenNo ? ` ${product.degisenNo}` : ""
          }</image:title>
    </image:image>`;
        }

        xml += `
  </url>`;
      });
    }

    // Add category pages with enhanced priority
    if (categories && categories.length) {
      categories.forEach((category: Category) => {
        xml += `
  <url>
    <loc>https://argesismakinalari.com/products?category=${encodeURIComponent(
      category.name
    )}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    }

    // Add brand pages with enhanced priority
    if (brands && brands.length) {
      brands.forEach((brand: Brand) => {
        xml += `
  <url>
    <loc>https://argesismakinalari.com/products?brand=${encodeURIComponent(
      brand.name
    )}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    }

    // Add combination pages for popular categories and brands for better SEO
    if (categories && brands) {
      const popularBrands = brands.slice(0, 5); // Top 5 brands
      const popularCategories = categories.slice(0, 5); // Top 5 categories

      popularBrands.forEach((brand: Brand) => {
        popularCategories.forEach((category: Category) => {
          xml += `
  <url>
    <loc>https://argesismakinalari.com/products?category=${encodeURIComponent(
      category.name
    )}&brand=${encodeURIComponent(brand.name)}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
        });
      });
    }

    // End XML
    xml += `
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
