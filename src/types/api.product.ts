import { Product } from ".";

export type APIGetProducts = {
  url: "/api/products";
  query?: {
    productIds?: string;
  };
  method: "get";
  result: {
    items: Product[];
    total: number;
  };
};

export type APICreateProduct = {
  url: "/api/products";
  method: "post";
  data: {
    name: string;
    price: number;
    regularPrice: number;
    description: string;
    sku: string;
    status: string;
    imageIds?: string[];
  };
  result: { id: string };
};

export type APIUpdateProduct = {
  url: "/api/products/{id}";
  method: "put";
  params: {
    id: string;
  };
  data: {
    name: string;
    price: number;
    regularPrice: number;
    description: string;
    sku: string;
    status: string;
  };
  result: void;
};

export type APIUpdateProductImages = {
  url: "/api/products/{id}/images";
  method: "post";
  params: {
    id: string;
  };
  data: {
    imageIds: string[];
  };
  result: void;
};

export type APIDeleteProduct = {
  url: "/api/products/{id}";
  method: "delete";
  params: {
    id: string;
  };
  result: void;
};
