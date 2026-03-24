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
  method: 'post';
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

// ── Auth ──────────────────────────────────────────────────────────────────────

export type ApiV1AuthLogin = APIService<
  'api.v1.auth.login',
  { username: string; password: string },
  {}
>;

export type ApiV1AuthAuthorize = APIService<
  'api.v1.auth.authorize',
  {},
  {}
>;

// ── Web: Cart ─────────────────────────────────────────────────────────────────

export type ApiV1WebCartGetOrCreate = APIService<
  'api.v1.web.cart.getOrCreate',
  {},
  CartShape
>;

export type ApiV1WebCartAddItem = APIService<
  'api.v1.web.cart.addItem',
  { productId: string },
  {}
>;

export type ApiV1WebCartRemoveItem = APIService<
  'api.v1.web.cart.removeItem',
  { productId: string },
  {}
>;

export type ApiV1WebCartIncreaseItem = APIService<
  'api.v1.web.cart.increaseItem',
  { productId: string },
  {}
>;

export type ApiV1WebCartDecreaseItem = APIService<
  'api.v1.web.cart.decreaseItem',
  { productId: string },
  {}
>;

export type ApiV1WebCartUpdateItem = APIService<
  'api.v1.web.cart.updateItem',
  { productId: string; quantity: number },
  {}
>;

export type ApiV1WebCartRemove = APIService<
  'api.v1.web.cart.remove',
  {},
  {}
>;

export type ApiV1WebCartCheckout = APIService<
  'api.v1.web.cart.checkout',
  {
    contact: { email: string };
    shipping: { firstName: string; lastName?: string; address?: string };
  },
  { orderId: string }
>;

// ── Web: Customer ─────────────────────────────────────────────────────────────

export type ApiV1WebCustomerCreate = APIService<
  'api.v1.web.customer.create',
  { email: string; password?: string; firstName: string },
  { id: string }
>;

export type ApiV1WebCustomerGet = APIService<
  'api.v1.web.customer.get',
  { id: string },
  { id: string; firstName: string | null; email: string | null }
>;

// ── Web: Product ──────────────────────────────────────────────────────────────

export type ApiV1WebProductGetList = APIService<
  'api.v1.web.product.getList',
  {},
  { items: ProductShape[] }
>;

export type ApiV1WebProductGet = APIService<
  'api.v1.web.product.get',
  { slug: string },
  ProductShape
>;

// ── Web: ProductCategory ──────────────────────────────────────────────────────

export type ApiV1WebProductCategoryGetList = APIService<
  'api.v1.web.productCategory.getList',
  {},
  { items: ProductCategoryShape[] }
>;

// ── Admin: File ───────────────────────────────────────────────────────────────

export type ApiV1AdminFileCreate = APIService<
  'api.v1.admin.file.create',
  { files: { fileName: string; url: string }[] },
  {}
>;

// ── Admin: Order ──────────────────────────────────────────────────────────────

export type ApiV1AdminOrderGetList = APIService<
  'api.v1.admin.order.getList',
  {},
  { items: OrderShape[] }
>;

export type ApiV1AdminOrderUpdate = APIService<
  'api.v1.admin.order.update',
  { id: string; status?: string; note?: string },
  {}
>;

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

export type ApiV1AdminProductAddImages = APIService<
  'api.v1.admin.product.addImages',
  { id: string; files: { fileName: string; url: string }[] },
  {}
>;

// ── Admin: ProductCategory ────────────────────────────────────────────────────

export type ApiV1AdminProductCategoryGetList = APIService<
  'api.v1.admin.productCategory.getList',
  {},
  { items: ProductCategoryShape[] }
>;
