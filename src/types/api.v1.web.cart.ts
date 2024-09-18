import { Cart, CartLineItem } from "@prisma/client";
import { APIService, Product } from "@/types";

export type ApiV1WebCartGetOrCreate = APIService<
  "api.v1.web.cart.getOrCreate",
  undefined,
  {
    id: string;
  }
>;

export type ApiV1WebCartGet = APIService<
  "api.v1.web.cart.get",
  undefined,
  Cart & {
    lineItems: Array<CartLineItem & { product: Product }>;
  }
>;

export type ApiV1WebCartCreate = APIService<
  "api.v1.web.cart.create",
  undefined,
  {
    id: string;
  }
>;

export type ApiV1WebCartAddItem = APIService<
  "api.v1.web.cart.addItem",
  {
    productId: string;
  },
  void
>;

export type ApiV1WebCartUpdateItem = APIService<
  "api.v1.web.cart.updateItem",
  {
    productId: string;
    quantity: number;
  },
  void
>;

export type ApiV1WebCartIncreaseItem = APIService<
  "api.v1.web.cart.increaseItem",
  {
    productId: string;
  },
  void
>;

export type ApiV1WebCartDecreaseItem = APIService<
  "api.v1.web.cart.decreaseItem",
  {
    productId: string;
  },
  void
>;

export type ApiV1WebCartRemoveItem = APIService<
  "api.v1.web.cart.removeItem",
  {
    productId: string;
  },
  void
>;
