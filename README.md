# gas-gpt-starter

`gas-gpt-starter` is a starter kit to use GPT-3 and ChatGPT in Google Apps Script.
You can clone [this sample sheet](https://docs.google.com/spreadsheets/d/1xYZbBp4TFuSxOfjsW0HJtDCS3UEI5nWYd2FfPxEoLnQ/edit?usp=sharing) if you want to use GPT-3 and ChatGPT function immediately without deployment.

Note: You need to set the OpenAI API key into script properties even though you cloned the sample sheet.

[👉 Check out how to add script properties.](https://developers.google.com/apps-script/guides/properties#manage_script_properties_manually)

## Status

[![Release (latest by date)](https://img.shields.io/github/v/release/Kazuki-tam/gas-gpt-starter)](https://github.com/Kazuki-tam/gas-gpt-starter/releases/tag/v0.0.1)
[![Issues](https://img.shields.io/github/issues/Kazuki-tam/gas-gpt-starter)](https://github.com/Kazuki-tam/gas-gpt-starter/issues)
![Maintenance](https://img.shields.io/maintenance/yes/2023)
![Release date](https://img.shields.io/github/release-date/Kazuki-tam/gas-gpt-starter)

## Features
- Just deploy this project code without development
- Develop locally with TypeScript, Clasp and Deno
- Bundle your files with esbuild

## Main dependencies

- [Google Apps Script](https://workspace.google.co.jp/intl/en/products/apps-script/)
- [OpenAI API](https://beta.openai.com/docs/api-reference/introduction)
- [Clasp](https://github.com/google/clasp)
- [esbuild](https://esbuild.github.io/)

## Prerequisites

- [Google Workspace](https://workspace.google.co.jp/)
- [OpenAI account](https://openai.com/api/)
- [Deno v1.29.4 or higher](https://deno.land/)

[🦕 How to install Deno](https://deno.land/manual@v1.29.4/getting_started/installation)

## How to use

Creating a repository from this template and cloning the repository.

### Login google account

```shell
deno task login
```

### Connect to your existing project

Create a `.clasp.json` at the root, and then add these settings.
Open the app script from your spreadsheet and check out your script id on the setting page.

```json
{
  "scriptId": "<SCRIPT_ID>",
  "rootDir": "./dist"
}
```

### Set OpenAI API key into script properties
1. Create a new secret key from [OpenAI API keys](https://beta.openai.com/account/api-keys).
2. Set the API key into script properties in your Apps Script project.

Note: The key name is must be `OPENAI_API_KEY`.

![Script Properties](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/del73wuy6tlz9k3h8l3s.png)

[📖 How to add script properties](https://developers.google.com/apps-script/guides/properties#manage_script_properties_manually)

### Upload a script project

Deploy your code to the existing project.

```shell
deno task deploy
```

### CHATGPT function
1. Authorize this project's script by execution
2. Use `=CHATGPT()` in your Google Workspace

You can add a system message with the second argument.

```
CHATGPT(prompt, system)

// Example 1 on Google Sheets
=CHATGPT("Hello, world!")

// Example 2 on Google Sheets
=CHATGPT(A1, "You are a helpful assistant.")
```

#### CHATGPT Parameters
1. prompt: The prompt to generate completions.
2. system: The system message to format response.

### GPT-3 function

1. Authorize this project's script by execution
2. Use `GPT3()` in your Google Workspace

```
GPT3(prompt, maxTokens, model, temperature)

// Example 1 on Google Sheets
=GPT3("Hello, world!")

// Example 2 on Google Sheets
=GPT3(A1, 200)

// Example 3 on Google Sheets
=GPT3(A1, 300, "text-babbage-001", 0.5)
```

![GPT3 function on Google Sheets](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vjh3uvjlironx80jrykx.png)

#### GPT-3 Parameters
1. prompt: The prompt to generate completions for, encoded as a string, array of strings, array of tokens, or array of token arrays.
2. maxTokens: The maximum number of tokens to generate in the completion.
3. model: ID of the model to use.
4. temperature: What sampling temperature to use. Higher values means the model will take more risks.

[📖 Learn more parameters](https://beta.openai.com/docs/api-reference/completions/create)

## Available Commands

Build your project.

```shell
deno task build
```

Build your project files and force writes all local files to script.google.com.

```shell
deno task deploy
```

Open the current directory's clasp project on script.google.com.

```shell
deno task open
```

## ChatGPT
`gpt-3.5-turbo` is supported in this project.

## GPT-3
You can use four main models with different levels of power suitable for different tasks.

- text-davinci-003
- text-curie-001
- text-babbage-001
- text-ada-001

[📖 Learn more API reference](https://platform.openai.com/docs/api-reference/introduction)

## License
MIT
