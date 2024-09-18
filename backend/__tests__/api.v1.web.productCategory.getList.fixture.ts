import { Prisma } from '@prisma/client';
import { APIRequest } from '../core/types';
import { ApiV1WebProductGetList } from '@ecom/types';

const valid: APIRequest<ApiV1WebProductGetList> = {
  headers: {},
  body: {},
};

const productCategories: Prisma.ProductCategoryCreateInput[] = [
  {
    title: 'Drink',
    slug: 'drink',
    image: {
      create: {
        fileName: 'drink.jpg',
        url: '/drink.jpg',
      },
    },
  },
  {
    title: 'Food',
    slug: 'food',
    image: {
      create: {
        fileName: 'food.jpg',
        url: '/food.jpg',
      },
    },
  },
  {
    title: 'Gift',
    slug: 'gift',
    image: {
      create: {
        fileName: 'gift.jpg',
        url: '/gift.jpg',
      },
    },
  },
];

export default {
  valid,
  postgresData: {
    productCategories,
  },
};
