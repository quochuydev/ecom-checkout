import { ApiV1WebCartAddItem } from '@ecom/types';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { getCookieValue } from '../lib/cookie';

const schema = z.object({
  //
});

const validate: Validate<ApiV1WebCartAddItem> = async (data, injection) => {
  return isValidRequest({
    data: {},
    schema,
  });
};

const authorize: Authorize<ApiV1WebCartAddItem> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebCartAddItem> = async (data, injection) => {
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

  if (cartLineItem) {
    const quantity = cartLineItem.quantity + 1;

    await prismaService.cartLineItem.update({
      where: {
        id: cartLineItem.id,
      },
      data: {
        quantity,
        totalPrice: quantity * 2.5,
      },
    });
  } else {
    await prismaService.cartLineItem.create({
      data: {
        cartId,
        productId,
        quantity: 1,
        price: 2.5,
        totalPrice: 1.8,
      },
    });
  }

  return {
    code: 200,
  };
};

const subject: ApiV1WebCartAddItem['subject'] = 'api.v1.web.cart.addItem';

export default {
  subject,
  validate,
  authorize,
  handle,
};
