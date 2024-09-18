import { APIRequest } from '../core/types';
import { ApiV1AdminProductCreate } from '@ecom/types';

const valid: APIRequest<ApiV1AdminProductCreate> = {
  headers: {},
  body: {
    title: 'Milk espresso (M)',
    price: 1.8,
    regularPrice: 2,
  },
};

export default {
  valid,
  postgresData: {
    product: {
      title: 'Milk espresso (M)',
      price: 1.8,
      regularPrice: 2,
    },
  },
};
