import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import OpenAI from "openai";
import { NextRequest } from "next/server";
import { COPILOTKIT_API_ENDPOINT } from "@/lib/constants";
import { env } from "@/lib/env";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
// Here, we are using GPT-3.5-turbo OpenAI model instead of the default `gpt-4o`
const serviceAdapter = new OpenAIAdapter({ openai, model: "gpt-3.5-turbo" });
const runtime = new CopilotRuntime();

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: COPILOTKIT_API_ENDPOINT,
  });

  return handleRequest(req);
};
