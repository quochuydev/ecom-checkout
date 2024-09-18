import { defaultHandler, isValidRequest } from '@/lib/api-handler';
import { prisma } from '@/lib/prisma';
import { nameToAsciiUsername } from '@/lib/transform';
import type { APICreateProduct, APIGetProducts, Product } from '@/types/api';
import type { Prisma } from '@prisma/client';
import type { NextRequest } from 'next/server';
import * as z from 'zod';

export async function GET(request: NextRequest) {
  return defaultHandler<APIGetProducts>({ request }, async () => {
    const condition: Prisma.ProductWhereInput = {};

    if (request.nextUrl.searchParams.get('productIds')) {
      const productIds = request.nextUrl.searchParams
        ?.get('productIds')
        ?.split(',');
      condition.id = { in: productIds };
    }

    const items = await prisma.product.findMany({
      where: condition,
      include: {
        images: true,
      },
    });

    return {
      items: items as Product[],
      total: items.length,
    };
  });
}

export async function POST(request: NextRequest) {
  return defaultHandler<APICreateProduct>({ request }, async (body) => {
    isValidRequest<APICreateProduct['data']>({
      data: {
        ...body,
      },
      schema: z.object({
        name: z.string(),
        price: z.number(),
        regularPrice: z.number(),
        description: z.string(),
        sku: z.string(),
        status: z.string(),
        imageIds: z.array(z.string()).optional(),
      }),
    });

    const result = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        regularPrice: body.regularPrice,
        description: body.description,
        sku: body.sku,
        status: body.status,
        slug: nameToAsciiUsername(body.name.toLowerCase()),
        createdBy: '',
      },
    });

    for (const imageId of body.imageIds || []) {
      await prisma.product.update({
        where: {
          id: result.id,
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

    return { id: result.id };
  });
}
