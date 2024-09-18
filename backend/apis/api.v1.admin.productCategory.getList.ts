import { ApiV1AdminProductCategoryGetList } from '@ecom/types';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';

const schema = z.object({
  //
});

const validate: Validate<ApiV1AdminProductCategoryGetList> = async (
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

const authorize: Authorize<ApiV1AdminProductCategoryGetList> = async (
  data,
  injection
) => {
  return { code: 200 };
};

const handle: Handle<ApiV1AdminProductCategoryGetList> = async (
  data,
  injection
) => {
  const prismaService = injection.prismaService;

  const productCategories = await prismaService.productCategory.findMany({
    where: {},
    include: {
      image: true,
    },
  });

  return {
    code: 200,
    body: {
      items: productCategories,
    },
  };
};

const subject: ApiV1AdminProductCategoryGetList['subject'] =
  'api.v1.admin.productCategory.getList';

export default {
  subject,
  validate,
  authorize,
  handle,
};
