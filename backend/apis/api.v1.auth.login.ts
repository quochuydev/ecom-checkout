import { ApiV1AuthLogin } from '@ecom/types/api.v1.auth';
import { Authorize, Handle, Validate } from '../core/types';

const validate: Validate<ApiV1AuthLogin> = async (data, injection) => {
  return { code: 200 };
};

const authorize: Authorize<ApiV1AuthLogin> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1AuthLogin> = async (data, injection) => {
  const { username, password } = data.body;
  return { code: 200 };
};

const subject: ApiV1AuthLogin['subject'] = 'api.v1.auth.login';

export default {
  subject,
  validate,
  authorize,
  handle,
};
