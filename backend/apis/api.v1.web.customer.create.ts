import { ApiV1WebCustomerCreate } from '@ecom/types';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';

const schema = z.object({
  //
});

const validate: Validate<ApiV1WebCustomerCreate> = async (data, injection) => {
  return isValidRequest({
    data: {},
    schema,
  });
};

const authorize: Authorize<ApiV1WebCustomerCreate> = async (
  data,
  injection
) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebCustomerCreate> = async (data, injection) => {
  const { prismaService } = injection;
  const { email, password, firstName } = data.body;

  const customer = await prismaService.customer.create({
    data: {
      email,
      firstName,
    },
  });

  return {
    code: 200,
    body: {
      id: customer.id,
    },
  };
};

const subject: ApiV1WebCustomerCreate['subject'] = 'api.v1.web.customer.create';

export default {
  subject,
  validate,
  authorize,
  handle,
};
