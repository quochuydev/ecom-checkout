import { ApiV1WebCartRemove } from '@ecom/types';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';

const schema = z.object({
  //
});

const validate: Validate<ApiV1WebCartRemove> = async (data, injection) => {
  return isValidRequest({
    data: {},
    schema,
  });
};

const authorize: Authorize<ApiV1WebCartRemove> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebCartRemove> = async (data, injection) => {
  return {
    code: 200,
    headers: {
      'set-cookie': `cartId=; Max-Age=0; SameSite=lax; Path=/; HttpOnly;`,
    },
  };
};

const subject: ApiV1WebCartRemove['subject'] = 'api.v1.web.cart.remove';

export default {
  subject,
  validate,
  authorize,
  handle,
};
