import { Prisma } from '@prisma/client';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { ApiV1WebProductGet } from '@ecom/types/api.v1.web.product';

const schema = z.object({
  //
});

const validate: Validate<ApiV1WebProductGet> = async (data, injection) => {
  return isValidRequest({
    data: {
      ...data.body,
    },
    schema,
  });
};

const authorize: Authorize<ApiV1WebProductGet> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1WebProductGet> = async (data, injection) => {
  const prismaService = injection.prismaService;

  const product = await prismaService.product.findFirst({
    where: {
      slug: data.body.slug,
    },
    include: {
      images: true,
    },
  });

  if (!product) {
    return {
      code: 404,
    };
  }

  return {
    code: 200,
    body: product,
  };
};

const subject: ApiV1WebProductGet['subject'] = 'api.v1.web.product.get';

export default {
  subject,
  validate,
  authorize,
  handle,
};
