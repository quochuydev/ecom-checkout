import { APIRequest } from '../core/types';
import { ApiV1WebProductGetList } from '@ecom/types';

const valid: APIRequest<ApiV1WebProductGetList> = {
  headers: {},
  body: {},
};

export default {
  valid,
  postgresData: {
    products: [
      {
        title: 'Bac siu (M)',
        price: 1.8,
        regularPrice: 2,
        slug: 'bac-siu-m',
      },
      {
        title: 'Bac siu (L)',
        price: 2.5,
        regularPrice: 3,
        slug: 'bac-siu-l',
      },
    ],
  },
};
