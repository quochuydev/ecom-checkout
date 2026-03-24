/* eslint-disable @next/next/no-img-element */

export default function CollectionCard({
  productCategory,
}: {
  productCategory: any;
}) {
  const imageUrl = productCategory.image?.url || "/placeholder.svg";

  return (
    <a
      href={`/categories/${productCategory.slug}`}
      className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]"
    >
      <img
        src={imageUrl}
        alt={productCategory.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-lg font-bold text-white">{productCategory.title}</h3>
        <span className="mt-1 inline-flex items-center text-sm text-white/80 group-hover:text-secondary transition-colors">
          Xem sản phẩm
          <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </a>
  );
}
