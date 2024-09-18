import { ApiV1WebCartUpdateItem } from '@ecom/types';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { getCookieValue } from '../lib/cookie';

const schema = z.object({
  //
});

const validate: Validate<ApiV1WebCartUpdateItem> = async (data, injection) => {
  return isValidRequest({
    data: {},
    schema,
  });
};

const authorize: Authorize<ApiV1WebCartUpdateItem> = async (
  data,
  injection
) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebCartUpdateItem> = async (data, injection) => {
  const { prismaService } = injection;
  const { productId, quantity } = data.body;

  const cartId = getCookieValue(data, 'cartId');
  if (!cartId) throw new Error('cartId is required');

  const cartLineItem = await prismaService.cartLineItem.findFirst({
    where: {
      cartId,
      productId,
    },
  });

  if (!cartLineItem) throw new Error('cartLineItem not found');

  await prismaService.cartLineItem.update({
    where: {
      id: cartLineItem.id,
    },
    data: {
      quantity,
    },
  });

  return {
    code: 200,
  };
};

const subject: ApiV1WebCartUpdateItem['subject'] = 'api.v1.web.cart.updateItem';

export default {
  subject,
  validate,
  authorize,
  handle,
};
