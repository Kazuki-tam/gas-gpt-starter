import { z } from "https://deno.land/x/zod@v3.20.2/mod.ts";
import {
  ChatGptFunctionSchema,
  ChatGptModelSchema,
  ChatGptRoleSchema,
  GptFunctionSchema,
  GptModelSchema,
} from "../schemas/openaiSchema.ts";

type ChatGptModel = z.infer<typeof ChatGptModelSchema>;
type GptModel = z.infer<typeof GptModelSchema>;

type MessageItem = {
  role: z.infer<typeof ChatGptRoleSchema>;
  content: string;
};

type ChatGptRequestOptions = {
  model: ChatGptModel;
  messages: MessageItem[];
};

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

type ChatGptFunction = z.infer<typeof ChatGptFunctionSchema>;
type GptFunction = z.infer<typeof GptFunctionSchema>;

type ChatGptApiInfo = {
  id: string;
  object: string;
  created: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: [
    {
      message: MessageItem;
    },
  ];
  finish_reason: string;
  index: number;
};

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

export type {
  ChatGptApiInfo,
  ChatGptFunction,
  ChatGptModel,
  ChatGptRequestOptions,
  GptApiInfo,
  GptFunction,
  GptModel,
  GptRequestOptions,
};
