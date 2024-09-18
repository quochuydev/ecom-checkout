import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { ApiV1AdminProductAddImages } from '@ecom/types';

const schema = z.object({
  //
});

const validate: Validate<ApiV1AdminProductAddImages> = async (
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

const authorize: Authorize<ApiV1AdminProductAddImages> = async (
  data,
  injection
) => {
  return { code: 200 };
};

const handle: Handle<ApiV1AdminProductAddImages> = async (data, injection) => {
  const { prismaService } = injection;
  const { id, files } = data.body;

  await prismaService.product.update({
    where: {
      id,
    },
    data: {
      images: {
        set: [],
      },
    },
  });

  for (const file of files) {
    const image = await prismaService.file.create({
      data: {
        fileName: file.fileName,
        url: file.url,
      },
    });

    await prismaService.product.update({
      where: {
        id,
      },
      data: {
        images: {
          connect: {
            id: image.id,
          },
        },
      },
    });
  }

  return { code: 200 };
};

const subject: ApiV1AdminProductAddImages['subject'] =
  'api.v1.admin.product.addImages';

export default {
  subject,
  validate,
  authorize,
  handle,
};
