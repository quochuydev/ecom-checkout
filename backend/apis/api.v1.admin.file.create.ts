import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { ApiV1AdminFileCreate } from '@ecom/types';

const schema = z.object({
  //
});

const validate: Validate<ApiV1AdminFileCreate> = async (data, injection) => {
  return isValidRequest({
    data: {
      ...data.body,
    },
    schema,
  });
};

const authorize: Authorize<ApiV1AdminFileCreate> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1AdminFileCreate> = async (data, injection) => {
  const { prismaService } = injection;
  const { files } = data.body;

  await prismaService.file.createMany({
    data: files.map((file) => ({
      fileName: file.fileName,
      url: file.url,
    })),
  });

  return {
    code: 200,
  };
};

const subject: ApiV1AdminFileCreate['subject'] = 'api.v1.admin.file.create';

export default {
  subject,
  validate,
  authorize,
  handle,
};
