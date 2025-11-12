import 'reflect-metadata';
import { container } from 'tsyringe';
import { FakeLLM } from 'langchain/llms/fake';
import { DynamicTool } from '@langchain/core/tools';

const bootstrap = async () => {

  const llm = new FakeLLM({
    responses: ['Hello, this is a fake response!', 'This is another fake response!'],
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
  container.register('tools', {
    useValue: tools,
  });

  container.register('baseChain_prompt', {
    useValue: '',
  });

  return container;
};

export default bootstrap;
