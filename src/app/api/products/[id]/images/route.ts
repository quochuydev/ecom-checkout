import { defaultHandler, isValidRequest } from '@/lib/api-handler';
import { prisma } from '@/lib/prisma';
import type { APIUpdateProductImages } from '@/types/api';
import type { NextRequest } from 'next/server';
import * as z from 'zod';

export async function POST(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  return defaultHandler<APIUpdateProductImages>({ request }, async (body) => {
    isValidRequest<
      APIUpdateProductImages['data'] & APIUpdateProductImages['params']
    >({
      data: {
        ...body,
        id,
      },
      schema: z.object({
        id: z.string(),
        imageIds: z.array(z.string()),
      }),
    });

    for (const imageId of body.imageIds) {
      await prisma.product.update({
        where: {
          id,
        },
        data: {
          images: {
            connect: {
              id: imageId,
            },
          },
        },
      });
    }
  });
}
