import { APIService, Product } from "@ecom/types";

export type ApiV1AdminProductGetList = APIService<
  "api.v1.admin.product.getList",
  {},
  {
    items: Product[];
  }
>;

export type ApiV1AdminProductCreate = APIService<
  "api.v1.admin.product.create",
  {
    title: string;
    description?: string;
    sku?: string;
    price: number;
    regularPrice: number;
  },
  {
    id: string;
  }
>;

export type ApiV1AdminProductUpdate = APIService<
  "api.v1.admin.product.update",
  {
    id: string;
    title: string;
    description?: string;
    sku?: string;
    price: number;
    regularPrice: number;
  },
  void
>;

export type ApiV1AdminProductRemove = APIService<
  "api.v1.admin.product.remove",
  {
    id: string;
  },
  void
>;

export type ApiV1AdminProductAddImages = APIService<
  "api.v1.admin.product.addImages",
  {
    id: string;
    files: Array<{
      fileName: string;
      url: string;
    }>;
  },
  void
>;
