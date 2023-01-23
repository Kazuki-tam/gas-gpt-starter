# gas-gpt-starter

`gas-gpt-starter` is a starter kit to use GPT-3 in Google Apps Script.

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

[📖 Learn more properties service](https://developers.google.com/apps-script/guides/properties#manage_script_properties_manually)

### Upload a script project

Deploy your code to the existing project.

```shell
deno task deploy
```

### GPT-3 function

1. Authorize this project's script by execution
2. Use `GPT3()` in your Google Workspace

```
GPT3(prompt, maxTokens, gptOptions)

// Example 1 on Google Sheets
=GPT3("Hello, world!")

// Example 2 on Google Sheets
=GPT3(A1, 200)

// Example 3 on Google Sheets
=GPT3(A1, 300, {model: "text-babbage-001"})
```

![GPT3 function on Google Sheets](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vjh3uvjlironx80jrykx.png)

### Parameters
1. prompt: The prompt to generate completions for, encoded as a string, array of strings, array of tokens, or array of token arrays.
2. maxTokens: The maximum number of tokens to generate in the completion.
3. gptOptions: The other options to adjust the completion

```
// Example of gptOptions
{
  // Defaults to text-davinci-003
  model: "text-curie-001",
  // Defaults to 0.3
  temperature: 0.5,
}
```

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

## GPT-3
You can use four main models with different levels of power suitable for different tasks.

- text-davinci-003
- text-curie-001
- text-babbage-001
- text-ada-001

[📖 Learn more GPT3](https://beta.openai.com/docs/models/gpt-3)

## License
MIT
