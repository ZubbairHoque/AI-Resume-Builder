import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle(process.env.PUCBLIC_NEXT_DATABASE_KEY!);
