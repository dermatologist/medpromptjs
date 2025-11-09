import 'reflect-metadata';
import { container } from 'tsyringe';
import { FakeListChatModel } from '@langchain/core/utils/testing';
import { z } from 'zod';
import { DynamicTool, DynamicStructuredTool } from '@langchain/core/tools';

const bootstrap = async () => {
  const fakeLLM = new FakeListChatModel({
    responses: ["I'll callback later.", "You 'console' them!"],
  });

  const tools = [
    new DynamicTool({
      name: 'FOO',
      description:
        'call this to get the value of foo. input should be an empty string.',
      func: async () => 'baz',
    }),
    // new DynamicStructuredTool({
    //   name: 'random-number-generator',
    //   description: 'generates a random number between two input numbers',
    //   schema: z.object({
    //     low: z.number().describe('The lower bound of the generated number'),
    //     high: z.number().describe('The upper bound of the generated number'),
    //   }),
    //   func: async (args: { low: number; high: number }) =>
    //     (Math.random() * (args.high - args.low) + args.low).toString(), // Outputs still must be strings
    // }),
  ];

  container.register('main-llm', {
    useValue: fakeLLM,
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
