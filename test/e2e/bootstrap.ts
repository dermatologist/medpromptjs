import 'reflect-metadata';
import { container } from 'tsyringe';
import { Ollama } from '@langchain/community/llms/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { pull } from 'langchain/hub';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

import { z } from 'zod';
import { DynamicTool, DynamicStructuredTool } from '@langchain/core/tools';

const bootstrap = async () => {
  const ollama = new Ollama({
    baseUrl: 'http://localhost:11434',
    model: 'phi3:mini',
  });

  const google = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    maxOutputTokens: 2048,
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const tools = [
    new DynamicTool({
      name: 'FOO',
      description:
        'call this to get the value of foo. input should be an empty string.',
      func: async () => 'baz',
    }),
    new DynamicStructuredTool({
      name: 'random-number-generator',
      description: 'generates a random number between two input numbers',
      schema: z.object({
        low: z.number().describe('The lower bound of the generated number'),
        high: z.number().describe('The upper bound of the generated number'),
      }),
      func: async ({ low, high }) =>
        (Math.random() * (high - low) + low).toString(), // Outputs still must be strings
    }),
  ];

  container.register('main-llm', {
    useValue: google,
  });

  container.register('chat_model', {
    useValue: true,
  });

  container.register('tools', {
    useValue: tools,
  });

  container.register('baseChain_prompt', {
    useValue: '',
  });

  return container;
};

export default bootstrap;
