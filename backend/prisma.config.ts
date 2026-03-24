import { defineConfig } from 'prisma/config';
import { PrismaPg } from '@prisma/adapter-pg';

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrate: {
    async adapter() {
      const { Pool } = await import('pg');
      const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
      return new PrismaPg(pool);
    },
  },
});
