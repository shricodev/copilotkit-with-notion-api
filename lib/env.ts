import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NOTION_SECRET_API_KEY: z.string().min(1),
    NOTION_DB_ID: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),

    COPILOTKIT_PUBLIC_KEY: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {},
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NOTION_SECRET_API_KEY: process.env.NOTION_SECRET_API_KEY,
    NOTION_DB_ID: process.env.NOTION_DB_ID,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,

    COPILOTKIT_PUBLIC_KEY: process.env.COPILOTKIT_PUBLIC_KEY,
  },
});
