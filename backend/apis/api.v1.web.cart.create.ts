import { ApiV1WebCartCreate } from '@ecom/types';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';

const schema = z.object({
  //
});

const validate: Validate<ApiV1WebCartCreate> = async (data, injection) => {
  return isValidRequest({
    data: {},
    schema,
  });
};

const authorize: Authorize<ApiV1WebCartCreate> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebCartCreate> = async (data, injection) => {
  const { prismaService } = injection;

  const cart = await prismaService.cart.create({
    data: {},
  });

  return {
    code: 200,
    headers: {
      'set-cookie': `cartId=${cart.id}; Path=/; HttpOnly`,
    },
    body: {
      id: cart.id,
    },
  };
};

const subject: ApiV1WebCartCreate['subject'] = 'api.v1.web.cart.create';

export default {
  subject,
  validate,
  authorize,
  handle,
};
