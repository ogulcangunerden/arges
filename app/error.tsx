"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-16 px-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-4xl font-bold">Bir Şeyler Yanlış Gitti</h1>
        <p className="text-zinc-600">
          Üzgünüz, bir hata oluştu. Teknk ekibimiz bu konuda bilgilendirildi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-[#febd00] hover:bg-[#e0a800] text-black"
          >
            Tekrar Dene
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Ana Sayfaya Dön</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
