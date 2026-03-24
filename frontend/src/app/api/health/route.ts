import { db } from '@/db';
import { getRedisClient } from '@/lib/redis';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = {
    db: { ok: false, error: undefined as string | undefined },
    redis: { ok: false, error: undefined as string | undefined },
  };

  // Check DB
  try {
    await db.execute(sql`SELECT 1`);
    result.db.ok = true;
  } catch (err: any) {
    result.db.error = err.message;
  }

  // Check Redis
  try {
    const redis = await getRedisClient();
    await redis.ping();
    result.redis.ok = true;
  } catch (err: any) {
    result.redis.error = err.message;
  }

  const allOk = result.db.ok && result.redis.ok;

  return NextResponse.json(result, { status: allOk ? 200 : 503 });
}
