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
};

type GptFunction = (
  prompt: GptRequestOptions["model"],
  maxTokens?: number,
  gptRequestOptions?: GptRequestOptions,
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
