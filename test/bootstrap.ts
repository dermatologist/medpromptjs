import 'reflect-metadata';
import { container } from 'tsyringe';
import { FakeListChatModel } from '@langchain/core/utils/testing';
import { DynamicTool } from '@langchain/core/tools';

const bootstrap = async () => {
  const llm = new FakeListChatModel({
    responses: [
      'Hello, this is a fake response!',
      'This is another fake response!',
    ],
  });

  const tools = [
    new DynamicTool({
      name: 'FOO',
      description:
        'call this to get the value of foo. input should be an empty string.',
      func: async () => 'baz',
    }),
  ];

  container.register('llm', {
    useValue: llm,
  });

  container.register('chat-model', {
    useValue: false,  // false has to be set as default. Only true here will be accepted here. The false here is irrelevant.
  });

  container.register('tools', {
    useValue: tools,
  });

  container.register('baseChain-template', {
    useValue: '{basechain}',
  });

  container.register('baseAgent-template', {
    useValue: '{baseagent}',
  });

  container.register('lLMLoop-template', {
    useValue: '{baseloop}',
  });

  return container;
};

export default bootstrap;
