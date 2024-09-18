import { Product, APIService } from "@/types";

export type ApiV1WebProductGetList = APIService<
  "api.v1.web.product.getList",
  {},
  {
    items: Product[];
  }
>;

export type ApiV1WebProductGet = APIService<
  "api.v1.web.product.get",
  {
    slug: string;
  },
  Product
>;
