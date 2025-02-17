import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export const env = createEnv({
  server: {
    NODE_ENV: z.string().min(1),
    DATABASE_HOST: z.string().min(1),
    DATABASE_USER: z.string().min(1),
    DATABASE_PASSWORD: z.string().min(1),
    DATABASE_NAME: z.string().min(1),
    DATABASE_PORT: z.string().min(1),
    DATABASE_URL: z.string().url(),
    DATABASE_MIGRATING: z.string().optional(),
    DATABASE_SEEDING: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  // runtimeEnv: {
  //   NODE_ENV: process.env.NODE_ENV,
  //   DATABASE_HOST: process.env.DATABASE_HOST,
  //   DATABASE_USER: process.env.DATABASE_USER,
  //   DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  //   DATABASE_NAME: process.env.DATABASE_NAME,
  //   DATABASE_PORT: process.env.DATABASE_PORT,
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   DATABASE_MIGRATING: process.env.DATABASE_MIGRATING,
  //   DATABASE_SEEDING: process.env.DATABASE_SEEDING,
  //   NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  // },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});

export type Env = typeof env;
