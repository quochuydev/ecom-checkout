import { APIService } from "@/types";
import { Customer } from "@prisma/client";

export type ApiV1WebCustomerCreate = APIService<
  "api.v1.web.customer.create",
  {
    firstName: string;
    email: string;
    password: string;
  },
  {
    id: string;
  }
>;

export type ApiV1WebCustomerGet = APIService<
  "api.v1.web.customer.get",
  {
    id: string;
  },
  Customer
>;
