import { ApiV1AdminOrderUpdate } from '@ecom/types/api.v1.admin.order';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';

const schema = z.object({
  //
});

const validate: Validate<ApiV1AdminOrderUpdate> = async (data, injection) => {
  return isValidRequest({
    data: {
      ...data.body,
    },
    schema,
  });
};

const authorize: Authorize<ApiV1AdminOrderUpdate> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1AdminOrderUpdate> = async (data, injection) => {
  const { prismaService } = injection;
  const { id } = data.body;

  await prismaService.order.update({
    where: {
      id,
    },
    data: {},
  });

  return { code: 200 };
};

const subject: ApiV1AdminOrderUpdate['subject'] = 'api.v1.admin.order.update';

export default {
  subject,
  validate,
  authorize,
  handle,
};
