import { APIService, Order } from "@/types";

export type ApiV1AdminOrderGetList = APIService<
  "api.v1.admin.order.getList",
  {},
  {
    items: Order[];
  }
>;

export type ApiV1AdminOrderUpdate = APIService<
  "api.v1.admin.order.update",
  {
    id: string;
  },
  void
>;
