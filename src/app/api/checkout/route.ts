import { defaultHandler, isValidRequest } from '@/lib/api-handler';
import type { APICheckout } from '@/types/api';
import type { NextRequest } from 'next/server';
import * as z from 'zod';

const schema = z.object({
  items: z.array(
    z.object({
      price: z.number(),
    }),
  ),
});

export async function POST(request: NextRequest) {
  return defaultHandler<APICheckout>({ request }, async (body) => {
    isValidRequest<APICheckout['data']>({
      data: {
        ...body,
      },
      schema,
    });
  });
}
