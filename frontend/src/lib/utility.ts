import { Product } from "@ecom/types/types";
import { Product as PrismaProduct, Image as PrismaImage } from "@prisma/client";

export const transformProduct = (
  product: PrismaProduct & { images?: PrismaImage[] }
): Product => {
  const {
    name,
    price,
    description,
    id,
    regularPrice,
    slug,
    status,
    sku,
    createdBy,
    createdDate,
    images = [],
  } = product;

  return {
    id,
    regularPrice,
    name,
    price,
    description,
    slug,
    status,
    sku,
    createdBy,
    createdDate,
    images: images.map((image) => ({
      id: image.id,
      src: image.src,
      alt: image.alt,
    })),
  };
};
