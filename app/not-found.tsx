import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-16 px-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-[#febd00]">404</h1>
        <h2 className="text-2xl font-bold">Sayfa Bulunamadı</h2>
        <p className="text-zinc-600">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </p>
        <Button
          asChild
          className="bg-[#febd00] hover:bg-[#e0a800] text-black mt-4"
        >
          <Link href="/">Ana Sayfaya Dön</Link>
        </Button>
      </div>
    </div>
  );
}
