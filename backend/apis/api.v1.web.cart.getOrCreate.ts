import { ApiV1WebCartGetOrCreate } from '@ecom/types';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { getCookieValue } from '../lib/cookie';

const schema = z.object({
  //
});

const validate: Validate<ApiV1WebCartGetOrCreate> = async (data, injection) => {
  return isValidRequest({
    data: {},
    schema,
  });
};

const authorize: Authorize<ApiV1WebCartGetOrCreate> = async (
  data,
  injection
) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebCartGetOrCreate> = async (data, injection) => {
  const { prismaService } = injection;

  const cartId = getCookieValue(data, 'cartId');

  let cart = cartId
    ? await prismaService.cart.findFirst({
        where: {
          id: cartId,
        },
        include: {
          lineItems: {
            include: {
              product: {
                include: {
                  images: true,
                },
              },
            },
          },
        },
      })
    : undefined;

  if (!cart) {
    cart = await prismaService.cart.create({
      data: {},
      include: {
        lineItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
  }

  return {
    code: 200,
    headers: {
      'set-cookie': `cartId=${cart.id}; SameSite=lax; Path=/; HttpOnly;`,
    },
    body: {
      ...cart,
      totalQuantity: 12,
    },
  };
};

const subject: ApiV1WebCartGetOrCreate['subject'] =
  'api.v1.web.cart.getOrCreate';

export default {
  subject,
  validate,
  authorize,
  handle,
};
