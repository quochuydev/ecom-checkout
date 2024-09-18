import { ApiV1AdminProductUpdate } from '@ecom/types/api.v1.admin.product';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';

const schema = z.object({
  //
});

const validate: Validate<ApiV1AdminProductUpdate> = async (data, injection) => {
  return isValidRequest({
    data: {
      ...data.body,
    },
    schema,
  });
};

const authorize: Authorize<ApiV1AdminProductUpdate> = async (
  data,
  injection
) => {
  return { code: 200 };
};

const handle: Handle<ApiV1AdminProductUpdate> = async (data, injection) => {
  const { prismaService } = injection;
  const { id, title, description, sku, price, regularPrice } = data.body;

  await prismaService.product.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      sku,
      price,
      regularPrice,
    },
  });

  return { code: 200 };
};

const subject: ApiV1AdminProductUpdate['subject'] =
  'api.v1.admin.product.update';

export default {
  subject,
  validate,
  authorize,
  handle,
};
