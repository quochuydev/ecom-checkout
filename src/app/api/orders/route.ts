import { defaultHandler } from '@/lib/api-handler';
import type { APIGetOrders } from '@/types/api';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return defaultHandler<APIGetOrders>({ request }, async () => {
    return { items: [], total: 0 };
  });
}
