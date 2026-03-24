/* eslint-disable @next/next/no-img-element */
"use client";
import { formatPrice } from "@/lib/constants";

export default function ProductCard({ product }: { product: any }) {
  const imageUrl = product.images?.[0]?.url || "/placeholder.svg";
  const hasDiscount = product.regularPrice && product.regularPrice > product.price;

  return (
    <div className="group relative">
      <a href={`/products/${product.slug}`} className="block">
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
          <img
            src={imageUrl}
            alt={product.title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
