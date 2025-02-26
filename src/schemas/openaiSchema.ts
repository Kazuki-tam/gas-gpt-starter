import { z } from "https://deno.land/x/zod@v3.20.2/mod.ts";

const ChatGptModelSchema = z.enum([
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "gpt-4",
  "gpt-4-turbo",
  "gpt-4o",
  "gpt-4o-mini",
  "o1",
  "o1-mini",
  "o3-mini",
  "gpt-4-vision-preview",
  "gpt-4-32k",
]);

const ChatGptRoleSchema = z.enum([
  "system",
  "user",
  "assistant",
]);

const ChatGptSystemSchema = z.string().optional();
const ChatGptPromptSchema = z.string();

const ChatGptFunctionArgsSchema = z.tuple([
  ChatGptPromptSchema,
  ChatGptSystemSchema,
  ChatGptModelSchema.optional(),
]);

const ChatGptFunctionSchema = z.function(ChatGptFunctionArgsSchema, z.string());

export {
  ChatGptFunctionSchema,
  ChatGptModelSchema,
  ChatGptRoleSchema,
  ChatGptSystemSchema,
};
