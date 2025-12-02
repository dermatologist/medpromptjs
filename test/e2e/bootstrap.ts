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

  container.register('main-llm', {
    useValue: llm,
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
