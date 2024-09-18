import { Prisma } from '@prisma/client';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { ApiV1WebProductGetList } from '@ecom/types/api.v1.web.product';

const schema = z.object({
  //
});

const validate: Validate<ApiV1WebProductGetList> = async (data, injection) => {
  return isValidRequest({
    data: {
      ...data.body,
    },
    schema,
  });
};

const authorize: Authorize<ApiV1WebProductGetList> = async (
  data,
  injection
) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebProductGetList> = async (data, injection) => {
  const prismaService = injection.prismaService;

  const products = await prismaService.product.findMany({
    where: {},
    include: {
      images: true,
    },
  });

  return {
    code: 200,
    body: {
      items: products,
    },
  };
};

const subject: ApiV1WebProductGetList['subject'] = 'api.v1.web.product.getList';

export default {
  subject,
  validate,
  authorize,
  handle,
};
