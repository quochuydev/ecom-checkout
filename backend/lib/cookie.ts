import cookie from 'cookie';
import { APIRequest } from '../core/types';
import { APIService } from '@ecom/types';

export function getCookieValue<T extends APIService>(
  data: APIRequest<T>,
  key: string
): string {
  const cookies = cookie.parse((data.headers['cookie'] || '') as string);
  return cookies[key];
}
