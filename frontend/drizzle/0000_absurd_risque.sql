CREATE TABLE "Blog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"createdDate" timestamp DEFAULT now() NOT NULL,
	"updatedDate" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Cart" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"amount" real DEFAULT 0 NOT NULL,
	"note" text
);
--> statement-breakpoint
CREATE TABLE "CartLineItem" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cartId" uuid NOT NULL,
	"productId" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"price" real NOT NULL,
	"totalPrice" real NOT NULL,
	"createdDate" timestamp DEFAULT now() NOT NULL,
	"updatedDate" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Customer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstName" text,
	"email" text
);
--> statement-breakpoint
CREATE TABLE "Image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"fileName" text NOT NULL,
	"createdDate" timestamp DEFAULT now() NOT NULL,
	"updatedDate" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "_ImageToProduct" (
	"A" uuid NOT NULL,
	"B" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customerId" uuid NOT NULL,
	"amount" real NOT NULL,
	"status" text NOT NULL,
	"note" text NOT NULL,
	"createdDate" timestamp DEFAULT now() NOT NULL,
	"updatedDate" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "OrderLineItem" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"productId" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"price" real NOT NULL,
	"totalPrice" real NOT NULL,
	"createdDate" timestamp DEFAULT now() NOT NULL,
	"updatedDate" timestamp DEFAULT now() NOT NULL,
	"orderId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"sku" text,
	"price" real DEFAULT 0 NOT NULL,
	"regularPrice" real DEFAULT 0 NOT NULL,
	"createdDate" timestamp DEFAULT now() NOT NULL,
	"updatedDate" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ProductCategory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"createdDate" timestamp DEFAULT now() NOT NULL,
	"updatedDate" timestamp DEFAULT now() NOT NULL,
	"imageId" uuid
);
--> statement-breakpoint
CREATE TABLE "_ProductToProductCategory" (
	"A" uuid NOT NULL,
	"B" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "CartLineItem" ADD CONSTRAINT "CartLineItem_cartId_Cart_id_fk" FOREIGN KEY ("cartId") REFERENCES "public"."Cart"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CartLineItem" ADD CONSTRAINT "CartLineItem_productId_Product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_ImageToProduct" ADD CONSTRAINT "_ImageToProduct_A_Image_id_fk" FOREIGN KEY ("A") REFERENCES "public"."Image"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_ImageToProduct" ADD CONSTRAINT "_ImageToProduct_B_Product_id_fk" FOREIGN KEY ("B") REFERENCES "public"."Product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_Customer_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "OrderLineItem" ADD CONSTRAINT "OrderLineItem_productId_Product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "OrderLineItem" ADD CONSTRAINT "OrderLineItem_orderId_Order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_imageId_Image_id_fk" FOREIGN KEY ("imageId") REFERENCES "public"."Image"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_ProductToProductCategory" ADD CONSTRAINT "_ProductToProductCategory_A_Product_id_fk" FOREIGN KEY ("A") REFERENCES "public"."Product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_ProductToProductCategory" ADD CONSTRAINT "_ProductToProductCategory_B_ProductCategory_id_fk" FOREIGN KEY ("B") REFERENCES "public"."ProductCategory"("id") ON DELETE no action ON UPDATE no action;