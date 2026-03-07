import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

const DATABASE_URL = env.DATABASE_URL || 'file:./dev.db';

let adapter;

if (DATABASE_URL.startsWith('postgresql://')) {
  adapter = new PrismaPg({ connectionString: DATABASE_URL });
} else {
  adapter = new PrismaBetterSqlite3({ url: DATABASE_URL });
}

const prisma = global.__prisma || new PrismaClient({ adapter });

if (dev) {
  global.__prisma = prisma;
}

export { prisma };
