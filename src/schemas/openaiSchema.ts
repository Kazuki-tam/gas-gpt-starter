import { z } from "https://deno.land/x/zod@v3.20.2/mod.ts";

const GptModelSchema = z.enum([
  "text-davinci-003",
  "text-curie-001",
  "text-babbage-001",
  "text-ada-001",
]).optional();
const GptPromptSchema = z.string().or(z.string().array());
const GptMaxTokensSchema = z.number().optional();
const GptTemperatureSchema = z.number().optional();

const GptFunctionArgsSchema = z.tuple([
  GptPromptSchema,
  GptMaxTokensSchema,
  GptModelSchema,
  GptTemperatureSchema,
]);
const GptFunctionSchema = z.function(GptFunctionArgsSchema, z.string());

export {
  GptFunctionSchema,
  GptMaxTokensSchema,
  GptModelSchema,
  GptTemperatureSchema,
};
