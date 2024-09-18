import { defaultHandler } from '@/lib/api-handler';
import { prisma } from '@/lib/prisma';
import type { APIGetImages, Image } from '@/types/api';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return defaultHandler<APIGetImages>({ request }, async () => {
    const items = await prisma.image.findMany({
      where: {},
      orderBy: {
        createdDate: 'desc',
      },
    });

    return {
      items: items as Image[],
      total: items.length,
    };
  });
}
