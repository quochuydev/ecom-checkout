import { Customer } from "@prisma/client";
import { APIService } from "@ecom/types";

export type ApiV1AdminCustomerGetList = APIService<
  "api.v1.admin.customer.getList",
  {},
  {
    items: Customer[];
  }
>;

export type ApiV1AdminCustomerCreate = APIService<
  "api.v1.admin.customer.create",
  {
    firstName: string;
    email: string;
  },
  {
    id: string;
  }
>;
