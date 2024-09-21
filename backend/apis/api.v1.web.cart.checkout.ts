import { ApiV1WebCartCheckout } from '@ecom/types';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { getCookieValue } from '../lib/cookie';

const schema = z.object({
  productId: z.string().trim(),
});

const validate: Validate<ApiV1WebCartCheckout> = async (data, injection) => {
  return isValidRequest({
    data: {},
    schema,
  });
};

const authorize: Authorize<ApiV1WebCartCheckout> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebCartCheckout> = async (data, injection) => {
  const { prismaService } = injection;
  const { contact, shipping } = data.body;

  const cartId = getCookieValue(data, 'cartId');
  if (!cartId) throw new Error('cartId is required');

  const cart = await prismaService.cart.findFirst({
    where: {
      id: cartId,
    },
    include: {
      lineItems: true,
    },
  });
  if (!cart) throw new Error('cart not found');

  const customer = await prismaService.customer.create({
    data: {
      email: contact.email,
      firstName: shipping.firstName,
    },
  });

  const order = await prismaService.order.create({
    data: {
      customerId: customer.id,
      amount: cart.amount,
      status: 'Pending',
      note: '',
      lineItems: {
        create: cart.lineItems.map((lineItem) => ({
          productId: lineItem.productId,
          quantity: lineItem.quantity,
          price: lineItem.price,
          totalPrice: lineItem.totalPrice,
        })),
      },
    },
  });

  return {
    code: 200,
    body: {
      orderId: order.id,
    },
  };
};

const subject: ApiV1WebCartCheckout['subject'] = 'api.v1.web.cart.checkout';

export default {
  subject,
  validate,
  authorize,
  handle,
};
