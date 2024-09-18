export type APICheckout = {
  url: "/api/checkout";
  method: "post";
  data: {
    items: any[];
  };
};
