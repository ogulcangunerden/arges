import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  title: string;
  imageUrl: string;
  category: string;
  slug: string;
}

export function ProductCard({
  title,
  imageUrl,
  category,
  slug,
}: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md">
      <Link href={`/products/${slug}`} className="block overflow-hidden">
        <div className="aspect-square relative bg-muted overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105 duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <Image
              src="/arges-yazi.svg"
              alt="Logo Watermark"
              fill
              className="opacity-60"
            />
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block text-xs font-medium text-muted-foreground mb-1">
            {category}
          </span>
          <h3 className="font-semibold text-lg truncate">{title}</h3>
        </div>
        <div className="flex justify-end">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full md:w-auto"
          >
            <Link href={`/products/${slug}`}>Detayları Gör</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
