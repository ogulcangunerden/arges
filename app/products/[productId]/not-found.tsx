import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Ürün Bulunamadı</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Aradığınız ürün bulunamadı veya silinmiş olabilir. Lütfen tüm
          ürünlerimize göz atın.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Tüm Ürünlere Dön
        </Link>
      </div>
    </div>
  );
}
