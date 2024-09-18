import { defaultHandler, isValidRequest } from '@/lib/api-handler';
import { prisma } from '@/lib/prisma';
import { nameToAsciiUsername } from '@/lib/transform';
import type {
  APIDeleteProductCategory,
  APIUpdateProductCategory,
} from '@/types/api';
import type { NextRequest } from 'next/server';
import * as z from 'zod';

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  return defaultHandler<APIUpdateProductCategory>({ request }, async (body) => {
    isValidRequest<
      APIUpdateProductCategory['data'] & APIUpdateProductCategory['params']
    >({
      data: {
        ...body,
        id,
      },
      schema: z.object({
        id: z.string(),
        name: z.string(),
      }),
    });

    await prisma.productCategory.update({
      where: {
        id,
      },
      data: {
        ...body,
        slug: nameToAsciiUsername(body.name),
        createdBy: '',
      },
    });
  });
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  return defaultHandler<APIDeleteProductCategory>({ request }, async () => {
    isValidRequest<APIDeleteProductCategory['params']>({
      data: {
        id,
      },
      schema: z.object({
        id: z.string(),
      }),
    });

    await prisma.productCategory.update({
      where: {
        id,
      },
      data: {
        deletedDate: new Date(),
      },
    });
  });
}
