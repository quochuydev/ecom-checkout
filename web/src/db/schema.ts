import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

// ── better-auth tables ──────────────────────────────────────────────────────
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  role: text('role').default('user'),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
});

// ── Customer ────────────────────────────────────────────────────────────────
export const customer = pgTable('Customer', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: text('firstName'),
  email: text('email'),
});

export const customerRelations = relations(customer, ({ many }) => ({
  orders: many(order),
}));

// ── Image ────────────────────────────────────────────────────────────────────
export const image = pgTable('Image', {
  id: uuid('id').primaryKey().defaultRandom(),
  url: text('url').notNull(),
  fileName: text('fileName').notNull(),
  createdDate: timestamp('createdDate').defaultNow().notNull(),
  updatedDate: timestamp('updatedDate').defaultNow().notNull(),
});

export const imageRelations = relations(image, ({ many }) => ({
  products: many(imageToProduct),
  productCategories: many(productCategory),
}));

// ── ProductCategory ──────────────────────────────────────────────────────────
export const productCategory = pgTable('ProductCategory', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  createdDate: timestamp('createdDate').defaultNow().notNull(),
  updatedDate: timestamp('updatedDate').defaultNow().notNull(),
  imageId: uuid('imageId').references(() => image.id),
});

export const productCategoryRelations = relations(
  productCategory,
  ({ one, many }) => ({
    image: one(image, {
      fields: [productCategory.imageId],
      references: [image.id],
    }),
    products: many(productToProductCategory),
  })
);

// ── Product ──────────────────────────────────────────────────────────────────
export const product = pgTable('Product', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  sku: text('sku'),
  price: real('price').default(0).notNull(),
  regularPrice: real('regularPrice').default(0).notNull(),
  createdDate: timestamp('createdDate').defaultNow().notNull(),
  updatedDate: timestamp('updatedDate').defaultNow().notNull(),
  deletedAt: timestamp('deletedAt'),
});

export const productRelations = relations(product, ({ many }) => ({
  orderLineItems: many(orderLineItem),
  cartLineItems: many(cartLineItem),
  images: many(imageToProduct),
  productCategories: many(productToProductCategory),
}));

// ── Image ↔ Product (many-to-many, matches Prisma's _ImageToProduct) ─────────
export const imageToProduct = pgTable('_ImageToProduct', {
  a: uuid('A').notNull().references(() => image.id),
  b: uuid('B').notNull().references(() => product.id),
});

export const imageToProductRelations = relations(imageToProduct, ({ one }) => ({
  image: one(image, { fields: [imageToProduct.a], references: [image.id] }),
  product: one(product, { fields: [imageToProduct.b], references: [product.id] }),
}));

// ── Product ↔ ProductCategory (many-to-many, matches Prisma's _ProductToProductCategory) ──
export const productToProductCategory = pgTable('_ProductToProductCategory', {
  a: uuid('A').notNull().references(() => product.id),
  b: uuid('B').notNull().references(() => productCategory.id),
});

export const productToProductCategoryRelations = relations(
  productToProductCategory,
  ({ one }) => ({
    product: one(product, {
      fields: [productToProductCategory.a],
      references: [product.id],
    }),
    productCategory: one(productCategory, {
      fields: [productToProductCategory.b],
      references: [productCategory.id],
    }),
  })
);

// ── Order ─────────────────────────────────────────────────────────────────────
export const order = pgTable('Order', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customerId')
    .notNull()
    .references(() => customer.id),
  amount: real('amount').notNull(),
  status: text('status').notNull(),
  note: text('note').notNull(),
  createdDate: timestamp('createdDate').defaultNow().notNull(),
  updatedDate: timestamp('updatedDate').defaultNow().notNull(),
});

export const orderRelations = relations(order, ({ one, many }) => ({
  customer: one(customer, {
    fields: [order.customerId],
    references: [customer.id],
  }),
  lineItems: many(orderLineItem),
}));

// ── OrderLineItem ─────────────────────────────────────────────────────────────
export const orderLineItem = pgTable('OrderLineItem', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('productId')
    .notNull()
    .references(() => product.id),
  quantity: integer('quantity').notNull(),
  price: real('price').notNull(),
  totalPrice: real('totalPrice').notNull(),
  createdDate: timestamp('createdDate').defaultNow().notNull(),
  updatedDate: timestamp('updatedDate').defaultNow().notNull(),
  orderId: uuid('orderId')
    .notNull()
    .references(() => order.id),
});

export const orderLineItemRelations = relations(orderLineItem, ({ one }) => ({
  product: one(product, {
    fields: [orderLineItem.productId],
    references: [product.id],
  }),
  order: one(order, {
    fields: [orderLineItem.orderId],
    references: [order.id],
  }),
}));

// ── Cart ──────────────────────────────────────────────────────────────────────
export const cart = pgTable('Cart', {
  id: uuid('id').primaryKey().defaultRandom(),
  amount: real('amount').default(0).notNull(),
  note: text('note'),
});

export const cartRelations = relations(cart, ({ many }) => ({
  lineItems: many(cartLineItem),
}));

// ── CartLineItem ──────────────────────────────────────────────────────────────
export const cartLineItem = pgTable('CartLineItem', {
  id: uuid('id').primaryKey().defaultRandom(),
  cartId: uuid('cartId')
    .notNull()
    .references(() => cart.id),
  productId: uuid('productId')
    .notNull()
    .references(() => product.id),
  quantity: integer('quantity').notNull(),
  price: real('price').notNull(),
  totalPrice: real('totalPrice').notNull(),
  createdDate: timestamp('createdDate').defaultNow().notNull(),
  updatedDate: timestamp('updatedDate').defaultNow().notNull(),
});

export const cartLineItemRelations = relations(cartLineItem, ({ one }) => ({
  cart: one(cart, { fields: [cartLineItem.cartId], references: [cart.id] }),
  product: one(product, {
    fields: [cartLineItem.productId],
    references: [product.id],
  }),
}));

// ── Blog ──────────────────────────────────────────────────────────────────────
export const blog = pgTable('Blog', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  createdDate: timestamp('createdDate').defaultNow().notNull(),
  updatedDate: timestamp('updatedDate').defaultNow().notNull(),
});
