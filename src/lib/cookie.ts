import configuration from '@/configuration';
import { atob, btoa } from '@/lib/bytes';
import { cookies } from 'next/headers';

export const stringify = (cookies: string[]): string => {
  return btoa(JSON.stringify(cookies));
};

export const parse = (stringified?: string): string[] => {
  try {
    return stringified ? JSON.parse(atob(stringified)) : [];
  } catch (error) {
    return [];
  }
};

export function setCookie(name: string, value: string) {
  const requestCookie = cookies();

  requestCookie.set({
    name,
    value,
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60, // 30d
    secure: true,
    domain: new URL(configuration.appUrl).hostname,
  });
}
