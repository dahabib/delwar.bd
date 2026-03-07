import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { DATABASE_URL } from '$env/static/private';
import { dev } from '$app/environment';

const adapter = new PrismaBetterSqlite3({
  url: DATABASE_URL,
});

const prisma = global.__prisma || new PrismaClient({ adapter });

if (dev) {
  global.__prisma = prisma;
}

export { prisma };
