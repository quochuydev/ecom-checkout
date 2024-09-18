import { defaultHandler, isValidRequest } from '@/lib/api-handler';
import { prisma } from '@/lib/prisma';
import { nameToAsciiUsername } from '@/lib/transform';
import type { APIDeleteProduct, APIUpdateProduct } from '@/types/api';
import type { NextRequest } from 'next/server';
import * as z from 'zod';

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  return defaultHandler<APIUpdateProduct>({ request }, async (body) => {
    isValidRequest<APIUpdateProduct['data'] & APIUpdateProduct['params']>({
      data: {
        ...body,
        id,
      },
      schema: z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        regularPrice: z.number(),
        description: z.string(),
        sku: z.string(),
        status: z.string(),
      }),
    });

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        price: body.price,
        regularPrice: body.regularPrice,
        description: body.description,
        sku: body.sku,
        status: body.status,
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
  return defaultHandler<APIDeleteProduct>({ request }, async () => {
    isValidRequest<APIDeleteProduct['params']>({
      data: {
        id,
      },
      schema: z.object({
        id: z.string(),
      }),
    });

    await prisma.product.update({
      where: {
        id,
      },
      data: {
        deletedDate: new Date(),
      },
    });
  });
}
