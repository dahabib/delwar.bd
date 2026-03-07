import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

const { Pool } = pg;

const DATABASE_URL = env.DATABASE_URL;

let prisma;

if (DATABASE_URL?.startsWith('postgresql://')) {
  const pool = new Pool({ connectionString: DATABASE_URL });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
} else {
  prisma = new PrismaClient();
}

if (dev) {
  global.__prisma = prisma;
}

export { prisma };
