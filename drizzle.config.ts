import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    out: './migrations',
    schema: './src/db/schema.ts',
    dbCredentials: {
        url: process.env.PUBLIC_NEXT_DATABASE_URL!,
  },
});
