import { defaultHandler, isValidRequest } from '@/lib/api-handler';
import { prisma } from '@/lib/prisma';
import { nameToAsciiUsername } from '@/lib/transform';
import type {
  APICreateProductCategory,
  APIGetProductCategories,
} from '@/types/api';
import type { NextRequest } from 'next/server';
import * as z from 'zod';

export async function GET(request: NextRequest) {
  return defaultHandler<APIGetProductCategories>({ request }, async () => {
    const items = await prisma.productCategory.findMany({});
    return { items, total: items.length };
  });
}

export async function POST(request: NextRequest) {
  return defaultHandler<APICreateProductCategory>({ request }, async (body) => {
    isValidRequest<APICreateProductCategory['data']>({
      data: {
        ...body,
      },
      schema: z.object({
        name: z.string(),
      }),
    });

    const result = await prisma.productCategory.create({
      data: {
        ...body,
        slug: nameToAsciiUsername(body.name.toLowerCase()),
        createdBy: '',
      },
    });

    return { id: result.id };
  });
}
