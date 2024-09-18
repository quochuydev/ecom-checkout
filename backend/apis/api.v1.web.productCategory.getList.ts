import { ApiV1WebProductCategoryGetList } from '@ecom/types';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';

const schema = z.object({
  //
});

const validate: Validate<ApiV1WebProductCategoryGetList> = async (
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

const authorize: Authorize<ApiV1WebProductCategoryGetList> = async (
  data,
  injection
) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebProductCategoryGetList> = async (
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

const subject: ApiV1WebProductCategoryGetList['subject'] =
  'api.v1.web.productCategory.getList';

export default {
  subject,
  validate,
  authorize,
  handle,
};
