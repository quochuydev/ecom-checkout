import { ApiV1WebCartRemoveItem } from '@ecom/types';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { getCookieValue } from '../lib/cookie';

const schema = z.object({
  //
});

const validate: Validate<ApiV1WebCartRemoveItem> = async (data, injection) => {
  return isValidRequest({
    data: {},
    schema,
  });
};

const authorize: Authorize<ApiV1WebCartRemoveItem> = async (
  data,
  injection
) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebCartRemoveItem> = async (data, injection) => {
  const { prismaService } = injection;
  const { productId } = data.body;

  const cartId = getCookieValue(data, 'cartId');
  if (!cartId) throw new Error('cartId is required');

  const cartLineItem = await prismaService.cartLineItem.findFirst({
    where: {
      cartId,
      productId,
    },
  });

  if (!cartLineItem) throw new Error('cartLineItem not found');

  await prismaService.cartLineItem.delete({
    where: {
      id: cartLineItem.id,
    },
  });

  return {
    code: 200,
  };
};

const subject: ApiV1WebCartRemoveItem['subject'] = 'api.v1.web.cart.removeItem';

export default {
  subject,
  validate,
  authorize,
  handle,
};
