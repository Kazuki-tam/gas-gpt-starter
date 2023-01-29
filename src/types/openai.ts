type GptModel =
  | "text-davinci-003"
  | "text-curie-001"
  | "text-babbage-001"
  | "text-ada-001";

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

type GptFunction = (
  prompt: GptRequestOptions["model"],
  maxTokens?: GptRequestOptions["max_tokens"],
  model?: GptModel,
  temperature?: GptRequestOptions["temperature"],
) => string;

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
