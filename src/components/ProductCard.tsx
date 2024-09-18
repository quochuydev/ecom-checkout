/* eslint-disable @next/next/no-img-element */
'use client';

export default function ProductCard({ product }: any) {
  return (
    <div
      key={product.id}
      className="inline-flex w-64 flex-col lg:mb-10 lg:w-auto"
    >
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-100">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-4">
          <a
            href={product.href}
            className="font-semibold text-gray-900 hover:underline"
          >
            <span className="absolute inset-0" />
            {product.name}
          </a>
          <p className="mt-1 text-gray-900">{product.price}</p>
        </div>
      </div>
    </div>
  );
}
