// Import necessary configurations and functions
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

// Define and export the configuration object
export default defineConfig({
    dialect: 'postgresql',  // Specify the database dialect
    out: './migrations',  // Set the output directory for migrations

    // List of schema files
    schema: [
      './src/db/schema.ts', 
      './src/db/documents.ts', 
      './src/db/education.ts',
      './src/db/experience.ts',
      './src/db/skills.ts',
      './src/db/personal-info.ts',
      './src/db/index.ts'
    ],

    // Database credentials configuration
    dbCredentials: {
        url: process.env.PUBLIC_NEXT_DATABASE_URL!, // Provide a default value or handle the undefined case
    }
});
 