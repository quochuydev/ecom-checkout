"use client";
import { formatPrice } from "@/lib/constants";
import Image from "next/image";

export default function ProductCard({ product }: { product: any }) {
  const imageUrl = product.images?.[0]?.url || "/placeholder.svg";
  const hasDiscount = product.regularPrice && product.regularPrice > product.price;

  return (
    <div className="group relative">
      <a href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {hasDiscount && (
            <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
              -{Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)}%
            </span>
          )}
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-primary">
              {formatPrice(product.price)}
            </p>
            {hasDiscount && (
              <p className="text-xs text-gray-400 line-through">
                {formatPrice(product.regularPrice)}
              </p>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}
