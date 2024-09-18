import { ApiV1WebCartGet } from '@ecom/types';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { getCookieValue } from '../lib/cookie';

const schema = z.object({
  //
});

const validate: Validate<ApiV1WebCartGet> = async (data, injection) => {
  return isValidRequest({
    data: {},
    schema,
  });
};

const authorize: Authorize<ApiV1WebCartGet> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebCartGet> = async (data, injection) => {
  const { prismaService } = injection;

  const cartId = getCookieValue(data, 'cartId');
  if (!cartId) throw new Error('cartId is required');

  const cart = await prismaService.cart.findFirst({
    where: {
      id: cartId,
    },
    include: {
      lineItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    return {
      code: 404,
    };
  }

  return {
    code: 200,
    body: { ...cart, totalQuantity: 12 },
  };
};

const subject: ApiV1WebCartGet['subject'] = 'api.v1.web.cart.get';

export default {
  subject,
  validate,
  authorize,
  handle,
};
