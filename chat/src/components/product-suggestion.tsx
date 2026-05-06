import type { Product } from "@/lib/types";

type Props = {
  product: Product;
};

function formatPrice(value: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function ProductSuggestion({ product }: Props) {
  const image = product.images?.[0];
  const imageUrl = image?.url ?? image?.src ?? null;

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#e4e6eb] bg-white">
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={product.title} className="h-28 w-full object-cover" />
      )}
      <div className="space-y-1 p-2.5">
        <div className="line-clamp-2 text-[13px] font-medium text-[#050505]">{product.title}</div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="font-semibold text-[#050505]">{formatPrice(product.price)}</span>
          {product.regularPrice > product.price && (
            <span className="text-xs text-[#65676b] line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
