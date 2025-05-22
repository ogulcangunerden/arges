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
    const productsResult = await getProducts(1000); // Get up to 1000 products
    const products = productsResult.products;
    const categories = await getCategories();
    const brands = await getBrands();

    // Start XML string
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://argesmakine.com/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://argesmakine.com/products</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://argesmakine.com/categories</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://argesmakine.com/brands</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://argesmakine.com/about</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://argesmakine.com/contact</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

    // Add all products
    if (products && products.length) {
      products.forEach((product: Product) => {
        xml += `
  <url>
    <loc>https://argesmakine.com/products/${product.id}</loc>
    <lastmod>${
      new Date(product.updatedAt || product.createdAt || new Date())
        .toISOString()
        .split("T")[0]
    }</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    }

    // Add category pages
    if (categories && categories.length) {
      categories.forEach((category: Category) => {
        xml += `
  <url>
    <loc>https://argesmakine.com/products?category=${encodeURIComponent(
      category.name
    )}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      });
    }

    // Add brand pages
    if (brands && brands.length) {
      brands.forEach((brand: Brand) => {
        xml += `
  <url>
    <loc>https://argesmakine.com/products?brand=${encodeURIComponent(
      brand.name
    )}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      });
    }

    // End XML
    xml += `
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
