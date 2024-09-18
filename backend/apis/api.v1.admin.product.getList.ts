import { ApiV1AdminProductGetList } from '@ecom/types/api.v1.admin.product';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';

const schema = z.object({
  //
});

const validate: Validate<ApiV1AdminProductGetList> = async (
  data,
  injection
) => {
  return isValidRequest({
    data: {
      ...data.body,
    },
    schema,
  });
};

const authorize: Authorize<ApiV1AdminProductGetList> = async (
  data,
  injection
) => {
  return { code: 200 };
};

const handle: Handle<ApiV1AdminProductGetList> = async (data, injection) => {
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

const subject: ApiV1AdminProductGetList['subject'] =
  'api.v1.admin.product.getList';

export default {
  subject,
  validate,
  authorize,
  handle,
};
