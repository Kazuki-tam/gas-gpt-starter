import { z } from "https://deno.land/x/zod@v3.20.2/mod.ts";

const ChatGptModelSchema = z.literal("gpt-3.5-turbo");

const ChatGptRoleSchema = z.enum([
  "system",
  "user",
  "assistant",
]);

const GptModelSchema = z.enum([
  "text-davinci-003",
  "text-curie-001",
  "text-babbage-001",
  "text-ada-001",
]).optional();

const ChatGptSystemSchema = z.string().optional();
const ChatGptPromptSchema = z.string();

const GptPromptSchema = z.string().or(z.string().array());
const GptMaxTokensSchema = z.number().optional();
const GptTemperatureSchema = z.number().optional();

const GptFunctionArgsSchema = z.tuple([
  GptPromptSchema,
  GptMaxTokensSchema,
  GptModelSchema,
  GptTemperatureSchema,
]);

const ChatGptFunctionArgsSchema = z.tuple([
  ChatGptPromptSchema,
  ChatGptSystemSchema,
]);

const ChatGptFunctionSchema = z.function(ChatGptFunctionArgsSchema, z.string());
const GptFunctionSchema = z.function(GptFunctionArgsSchema, z.string());

export {
  ChatGptSystemSchema,
  ChatGptFunctionSchema,
  ChatGptModelSchema,
  ChatGptRoleSchema,
  GptFunctionSchema,
  GptMaxTokensSchema,
  GptModelSchema,
  GptTemperatureSchema,
};
