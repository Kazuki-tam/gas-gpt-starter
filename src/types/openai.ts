import { z } from "https://deno.land/x/zod@v3.20.2/mod.ts";
import { GptFunctionSchema, GptModelSchema } from "../schemas/openaiSchema.ts";

type GptModel = z.infer<typeof GptModelSchema>;

type GptRequestOptions = {
  model: GptModel;
  prompt: string | string[];
  suffix: string | null;
  max_tokens: number;
  temperature: number;
  top_p: number;
  n: number;
  stream: boolean;
  logprobs: number | null;
  echo: boolean;
  stop: string | string[] | null;
  presence_penalty: number;
  frequency_penalty: number;
  best_of: number;
  logit_bias: Map<string, number> | null;
  user?: string;
};

type GptFunction = z.infer<typeof GptFunctionSchema>;

type GptApiInfo = {
  id: string;
  object: string;
  model: string;
  choices: [
    {
      text: string;
      index: number;
      logprobs: null;
      finish_reason: string;
    },
  ];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type { GptApiInfo, GptFunction, GptModel, GptRequestOptions };
