/* eslint-disable @next/next/no-img-element */
"use client";

import { Product } from "@ecom/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      key={product.id}
      className="inline-flex w-64 flex-col lg:mb-10 lg:w-auto"
    >
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-100">
          <img
            src={product.images?.[0]?.url}
            alt={product.images?.[0]?.fileName}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-4">
          <a
            href={`/products/${product.slug}`}
            className="font-semibold text-gray-900 hover:underline"
          >
            <span className="absolute inset-0" />
            {product.title}
          </a>
          <p className="mt-1 text-gray-900">{product.price}</p>
        </div>
      </div>
    </div>
  );
}
