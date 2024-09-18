import { ProductCategory } from ".";

export type APIGetProductCategories = {
  url: "/api/productCategories";
  method: "get";
  result: {
    items: ProductCategory[];
  };
};

export type APICreateProductCategory = {
  url: "/api/productCategories";
  method: "post";
  data: {
    name: string;
  };
  result: {
    id: string;
  };
};

export type APIUpdateProductCategory = {
  url: "/api/productCategories/{id}";
  method: "put";
  params: {
    id: string;
  };
  data: {
    name: string;
  };
};

export type APIDeleteProductCategory = {
  url: "/api/productCategories/{id}";
  method: "delete";
  params: {
    id: string;
  };
};
