// ── Base types ────────────────────────────────────────────────────────────────

export type APIService<
  Subject = string,
  Request = any,
  Response = any,
> = {
  subject: Subject;
  request: Request;
  response: Response;
};

/** Wraps an APIService into a shape compatible with api-caller's Default type */
export type API<T extends APIService> = {
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  data: T['request'];
  result: T['response'];
};

// ── Shared shapes ─────────────────────────────────────────────────────────────

export type ImageShape = {
  id: string;
  url: string;
  fileName: string;
  createdDate: Date;
  updatedDate: Date;
};

export type ProductShape = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  sku: string | null;
  price: number;
  regularPrice: number;
  createdDate: Date;
  updatedDate: Date;
  images: ImageShape[];
};

export type CartLineItemShape = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
  createdDate: Date;
  updatedDate: Date;
  product: ProductShape;
};

export type CartShape = {
  id: string;
  amount: number;
  note: string | null;
  lineItems: CartLineItemShape[];
  totalQuantity: number;
};

export type OrderLineItemShape = {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  price: number;
  totalPrice: number;
  createdDate: Date;
  updatedDate: Date;
};

export type OrderShape = {
  id: string;
  customerId: string;
  amount: number;
  status: string;
  note: string;
  createdDate: Date;
  updatedDate: Date;
  lineItems: OrderLineItemShape[];
  customer: { id: string; firstName: string | null; email: string | null };
};

export type ProductCategoryShape = {
  id: string;
  title: string;
  slug: string;
  createdDate: Date;
  updatedDate: Date;
  imageId: string | null;
  image: ImageShape | null;
};

// ── Admin: Product ────────────────────────────────────────────────────────────

export type ApiV1AdminProductCreate = APIService<
  'api.v1.admin.product.create',
  {
    title: string;
    description?: string;
    sku?: string;
    price: number;
    regularPrice: number;
  },
  { id: string }
>;

export type ApiV1AdminProductUpdate = APIService<
  'api.v1.admin.product.update',
  {
    id: string;
    title?: string;
    description?: string;
    sku?: string;
    price?: number;
    regularPrice?: number;
  },
  {}
>;

export type ApiV1AdminProductGetList = APIService<
  'api.v1.admin.product.getList',
  {},
  { items: ProductShape[] }
>;

// ── Admin: ProductCategory ────────────────────────────────────────────────────

export type ApiV1AdminProductCategoryGetList = APIService<
  'api.v1.admin.productCategory.getList',
  {},
  { items: ProductCategoryShape[] }
>;
