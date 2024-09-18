import { ApiV1WebCustomerGet } from '@ecom/types';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';

const schema = z.object({
  //
});

const validate: Validate<ApiV1WebCustomerGet> = async (data, injection) => {
  return isValidRequest({
    data: {},
    schema,
  });
};

const authorize: Authorize<ApiV1WebCustomerGet> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebCustomerGet> = async (data, injection) => {
  const { prismaService } = injection;
  const { id } = data.body;

  const customer = await prismaService.customer.findFirst({
    where: {
      id,
    },
  });

  // if (!customer) throw new Error('customer not found');

  return {
    code: 200,
    body: {
      id: 'test',
      firstName: 'Huy',
      email: 'huy@test.com',
    },
  };
};

const subject: ApiV1WebCustomerGet['subject'] = 'api.v1.web.customer.get';

export default {
  subject,
  validate,
  authorize,
  handle,
};
