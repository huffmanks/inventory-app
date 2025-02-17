import { defineConfig } from "drizzle-kit";

import { DATABASE_PREFIX } from "./src/config/site";
import { env } from "./src/env";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: env.DATABASE_HOST,
    port: Number(env.DATABASE_PORT),
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  },
  tablesFilter: [`${DATABASE_PREFIX}_*`],
  verbose: true,
  strict: true,
});
