import { APIRequest } from '../core/types';
import { ApiV1AdminProductGetList } from '@ecom/types';

const valid: APIRequest<ApiV1AdminProductGetList> = {
  headers: {},
  body: {},
};

export default {
  valid,
  postgresData: {
    products: [
      {
        title: 'Americano (M)',
        price: 1.8,
        regularPrice: 2,
        slug: 'americano-m',
      },
      {
        title: 'Americano (L)',
        price: 2.5,
        regularPrice: 3,
        slug: 'americano-l',
      },
    ],
  },
};
