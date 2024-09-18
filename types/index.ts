export * from "./types";
export * from "./api.v1.admin.customer";
export * from "./api.v1.admin.file";
export * from "./api.v1.admin.product";
export * from "./api.v1.admin.order";
export * from "./api.v1.auth";
export * from "./api.v1.web.cart";
export * from "./api.v1.web.product";
export * from "./api.v1.web.productCategory";
export * from "./api.v1.web.customer";
export * from "./api.product";
export * from "./api.productCategory";
export * from "./api.order";
export * from "./api.cart";
export * from "./api.image";

export type APIService<Subject = string, Request = any, Response = any> = {
  subject: Subject;
  request: Request;
  response: Response;
};

export type API<T extends APIService> = {
  url: `/api/${T["subject"]}`;
  method: "post";
  data: T["request"];
  result: T["response"];
};
