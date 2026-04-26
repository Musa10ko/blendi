import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts', // перевірте шлях до вашої схеми
  out: './drizzle',
  dialect: 'postgresql', // ВАЖЛИВО: тепер пишемо так
  dbCredentials: {
    host: 'localhost',
    port: 5433,
    user: 'user',
    password: 'password',
    database: 'blender',
    ssl: false,
  },
});
