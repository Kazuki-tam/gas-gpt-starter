import { z } from "https://deno.land/x/zod@v3.20.2/mod.ts";
import {
  ChatGptFunctionSchema,
  ChatGptModelSchema,
  ChatGptRoleSchema,
} from "../schemas/openaiSchema.ts";

type ChatGptModel = z.infer<typeof ChatGptModelSchema>;

type MessageItem = {
  role: z.infer<typeof ChatGptRoleSchema>;
  content: string;
};

type ChatGptRequestOptions = {
  model: ChatGptModel;
  messages: MessageItem[];
};

type ChatGptFunction = z.infer<typeof ChatGptFunctionSchema>;

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

export type {
  ChatGptApiInfo,
  ChatGptFunction,
  ChatGptModel,
  ChatGptRequestOptions,
};
