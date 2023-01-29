import { z } from "https://deno.land/x/zod@v3.20.2/mod.ts";

const GptModelSchema = z.enum([
  "text-davinci-003",
  "text-curie-001",
  "text-babbage-001",
  "text-ada-001",
]);
const GptPromptSchema = z.string().or(z.string().array());
const GptMaxTokensSchema = z.number().optional();
const GptTemperatureSchema = z.number().optional();

const GptFunctionArgsSchema = z.tuple([GptPromptSchema, GptMaxTokensSchema]);
const GptFunctionSchema = z.function(GptFunctionArgsSchema, z.string());

// const GptChoicesSchema = z.object({
//   text: z.string(),
//   index: z.number(),
//   logprobs: z.null(),
//   finish_reason: z.string()
// })

// const GptUsageSchema = z.object({
//   prompt_tokens: z.number(),
//   completion_tokens: z.number(),
//   total_tokens: z.number()
// })

// const GptApiSchema = z.object({
//   id: z.string(),
//   object: z.string(),
//   model: z.string(),
//   choices: z.array(GptChoicesSchema),
//   usage: GptUsageSchema
// })

export {
  GptFunctionSchema,
  GptMaxTokensSchema,
  GptModelSchema,
  GptTemperatureSchema,
};
