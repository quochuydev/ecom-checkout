import { ApiV1AdminOrderGetList } from '@ecom/types/api.v1.admin.order';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';

const schema = z.object({
  //
});

const validate: Validate<ApiV1AdminOrderGetList> = async (data, injection) => {
  return isValidRequest({
    data: {
      ...data.body,
    },
    schema,
  });
};

const authorize: Authorize<ApiV1AdminOrderGetList> = async (
  data,
  injection
) => {
  return { code: 200 };
};

const handle: Handle<ApiV1AdminOrderGetList> = async (data, injection) => {
  const prismaService = injection.prismaService;

  const orders = await prismaService.order.findMany({
    where: {},
    include: {
      lineItems: true,
    },
  });

  return {
    code: 200,
    body: {
      items: orders,
    },
  };
};

const subject: ApiV1AdminOrderGetList['subject'] = 'api.v1.admin.order.getList';

export default {
  subject,
  validate,
  authorize,
  handle,
};
