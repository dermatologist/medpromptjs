import 'reflect-metadata';
import { container } from 'tsyringe';
import { Ollama } from '@langchain/community/llms/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { pull } from 'langchain/hub';

import { z } from 'zod';
import { DynamicTool, DynamicStructuredTool } from '@langchain/core/tools';

const bootstrap = async () => {
  const ollama = new Ollama({
    baseUrl: 'http://localhost:11434',
    model: 'phi3',
  });

  const prompt = await pull<ChatPromptTemplate>(
    'hwchase17/structured-chat-agent'
  );

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
    useValue: ollama,
  });
  container.register('tools', {
    useValue: tools,
  });
  container.register('prompt', {
    useValue: prompt,
  });
  container.register('baseChain_prompt', {
    useValue: '',
  });

  return container;
};

export default bootstrap;
