import { ProductCategory, APIService } from "@ecom/types";

export type ApiV1WebProductCategoryGetList = APIService<
  "api.v1.web.productCategory.getList",
  {},
  {
    items: ProductCategory[];
  }
>;
