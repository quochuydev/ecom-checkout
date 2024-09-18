import { Prisma } from '@prisma/client';
import { APIRequest } from '../core/types';
import { ApiV1AdminProductGetList } from '@ecom/types';

const valid: APIRequest<ApiV1AdminProductGetList> = {
  headers: {},
  body: {},
};

const products: Prisma.ProductCreateInput[] = [
  {
    title: 'Americano (M)',
    price: 1.8,
    regularPrice: 2,
    slug: 'americano-m',
    images: {
      create: {
        fileName: 'americano-m.jpg',
        url: '/americano-m.jpg',
      },
    },
  },
  {
    title: 'Americano (L)',
    price: 2.5,
    regularPrice: 3,
    slug: 'americano-l',
    images: {
      create: {
        fileName: 'americano-l.jpg',
        url: '/americano-l.jpg',
      },
    },
  },
  {
    title: 'Milk espresso (M)',
    price: 1.8,
    regularPrice: 2,
    slug: 'milk-espresso-m',
    images: {
      create: {
        fileName: 'milk-espresso-m.jpg',
        url: '/milk-espresso-m.jpg',
      },
    },
  },
  {
    title: 'Bac siu (M)',
    price: 1.8,
    regularPrice: 2,
    slug: 'bac-siu-m',
    images: {
      create: {
        fileName: 'bac-siu-m.jpg',
        url: '/bac-siu-m.jpg',
      },
    },
  },
  {
    title: 'Bac siu (L)',
    price: 2.5,
    regularPrice: 3,
    slug: 'bac-siu-l',
    images: {
      create: {
        fileName: 'bac-siu-l.jpg',
        url: '/bac-siu-l.jpg',
      },
    },
  },
];

export default {
  valid,
  postgresData: {
    products,
  },
};
