import { ProductCategory, APIService } from "@ecom/types";

export type ApiV1AdminProductCategoryGetList = APIService<
  "api.v1.admin.productCategory.getList",
  {},
  {
    items: ProductCategory[];
  }
>;
