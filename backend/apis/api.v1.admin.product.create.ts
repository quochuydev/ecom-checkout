import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { ApiV1AdminProductCreate } from '@ecom/types/api.v1.admin.product';
import slugify from 'slugify';

const schema = z.object({
  //
});

const validate: Validate<ApiV1AdminProductCreate> = async (data, injection) => {
  return isValidRequest({
    data: {
      ...data.body,
    },
    schema,
  });
};

const authorize: Authorize<ApiV1AdminProductCreate> = async (
  data,
  injection
) => {
  return { code: 200 };
};

const handle: Handle<ApiV1AdminProductCreate> = async (data, injection) => {
  const { prismaService } = injection;
  const { title, description, sku, price, regularPrice } = data.body;

  const result = await prismaService.product.create({
    data: {
      title,
      description,
      sku,
      price,
      regularPrice,
      slug: slugify(title.toLowerCase()),
    },
  });

  return {
    code: 200,
    body: {
      id: result.id,
    },
  };
};

const subject: ApiV1AdminProductCreate['subject'] =
  'api.v1.admin.product.create';

export default {
  subject,
  validate,
  authorize,
  handle,
};
