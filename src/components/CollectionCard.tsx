/* eslint-disable @next/next/no-img-element */
import { ProductCategory } from "@ecom/types";

export default function CollectionCard({
  productCategory,
}: {
  productCategory: ProductCategory;
}) {
  return (
    <div className="group relative">
      <div className="sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
        <img
          src={productCategory.image?.url}
          alt={productCategory.image?.fileName}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-6 text-sm text-gray-500">
        <a href={productCategory.slug}>
          <span className="absolute inset-0" />
          {productCategory.title}
        </a>
      </h3>
      <p className="text-base font-semibold text-gray-900">
        {productCategory.description}
      </p>
    </div>
  );
}
