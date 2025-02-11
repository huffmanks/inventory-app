/** @type {import('next').NextConfig} */

import withSerwistInit from "@serwist/next";
import { createJiti } from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

async function getEnvConfig() {
  const env = await jiti.import("./src/env");
  return env;
}

const nextConfig = {};

export default async () => {
  const env = await getEnvConfig();

  const withSerwist = withSerwistInit({
    swSrc: "src/app/sw.ts",
    swDest: "public/sw.js",
    disable: env.NODE_ENV === "development" ? true : false,
  });

  return withSerwist(nextConfig);
};
