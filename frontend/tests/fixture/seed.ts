import { ProductCategory } from "@ecom/types";
import {} from "@prisma/client";

const productCategories: ProductCategory[] = [
  {
    title: "Drink",
    handle: "drink",
    description: "Category 1 description",
    image: {
      create: {
        name: "Product 1 image 1",
        src: "/product_1.png",
        alt: "Product 1 image 1 alt",
      },
    },
  },
  {
    name: "Category 2",
    slug: "category-2",
    description: "Category 2 description",
    createdBy: "admin",
    image: {
      create: {
        name: "Product 1 image 1",
        src: "/product_1.png",
        alt: "Product 1 image 1 alt",
      },
    },
  },
  {
    name: "Category 3",
    slug: "category-3",
    description: "Category 3 description",
    createdBy: "admin",
    image: {
      create: {
        name: "Product 1 image 1",
        src: "/product_1.png",
        alt: "Product 1 image 1 alt",
      },
    },
  },
];

const products = [
  {
    name: "Product 1",
    slug: "product-1",
    description: "Product 1 description",
    status: "active",
    price: "100",
    regularPrice: "100",
    sku: "product-1",
    createdBy: "admin",
    images: {
      create: [
        {
          name: "Product 1 image 1",
          src: "/product_1.png",
          alt: "Product 1 image 1 alt",
        },
        {
          name: "Product 1 image 2",
          src: "/product_2.png",
          alt: "Product 1 image 2 alt",
        },
      ],
    },
  },
  {
    name: "Product 2",
    slug: "product-2",
    description: "Product 2 description",
    status: "active",
    price: "200",
    regularPrice: "200",
    sku: "product-2",
    createdBy: "admin",
    images: {
      create: [
        {
          name: "Product 2 image 2",
          src: "/product_2.png",
          alt: "Product 2 image 2 alt",
        },
        {
          name: "Product 2 image 2",
          src: "/product_2.png",
          alt: "Product 2 image 2 alt",
        },
      ],
    },
  },
  {
    name: "Product 3",
    slug: "product-3",
    description: "Product 3 description",
    status: "active",
    price: "300",
    regularPrice: "300",
    sku: "product-3",
    createdBy: "admin",
    images: {
      create: [
        {
          name: "Product 3 image 3",
          src: "/product_3.png",
          alt: "Product 3 image 3 alt",
        },
        {
          name: "Product 3 image 3",
          src: "/product_3.png",
          alt: "Product 3 image 3 alt",
        },
      ],
    },
  },
  {
    name: "Product 4",
    slug: "product-4",
    description: "Product 4 description",
    status: "active",
    price: "400",
    regularPrice: "400",
    sku: "product-4",
    createdBy: "admin",
    images: {
      create: [
        {
          name: "Product 4 image 4",
          src: "/product_4.png",
          alt: "Product 4 image 4 alt",
        },
        {
          name: "Product 4 image 4",
          src: "/product_4.png",
          alt: "Product 4 image 4 alt",
        },
      ],
    },
  },
];

const fixture = {
  productCategories,
  products,
};

export default fixture;
