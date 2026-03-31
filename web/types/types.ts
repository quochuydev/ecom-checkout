export type Image = {
  id: string;
  url: string;
  fileName: string;
  createdDate: Date;
  updatedDate: Date;
};

export type Customer = {
  id: string;
  firstName: string | null;
  email: string | null;
};

export type OrderLineItem = {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
  createdDate: Date;
  updatedDate: Date;
  orderId: string;
};

export type Order = {
  id: string;
  customerId: string;
  amount: number;
  status: string;
  note: string;
  createdDate: Date;
  updatedDate: Date;
  lineItems: OrderLineItem[];
  customer: Customer;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  sku: string | null;
  price: number;
  regularPrice: number;
  createdDate: Date;
  updatedDate: Date;
  images?: Image[];
};

export type CartLineItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
  createdDate: Date;
  updatedDate: Date;
};

export type Cart = {
  id: string;
  amount: number;
  note: string | null;
  lineItems: Array<CartLineItem & { product: Product }>;
};

export type ProductCategory = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  products?: Product[];
  image: Image | null;
};
