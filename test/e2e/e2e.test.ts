import { LLMLoop } from '../../src/llm_loop/base';
import bootstrap from './bootstrap';

describe('LLMLoop', () => {
  let llmLoop: LLMLoop;

  beforeAll(async () => {
    const _container = await bootstrap();
    llmLoop = new LLMLoop(_container, '', '');
  });


  it('should check assertion correctly', async () => {
    const result = await llmLoop.checkAssertion('test', {});
    expect(result).toBe(true);
  });

  it('should check mention correctly', async () => {
    const result = await llmLoop.checkMention('test', {});
    expect(result).toBe(true);
  });

  it('should check negation correctly', async () => {
    const result = await llmLoop.checkNegation('test', {});
    expect(result).toBe(true);
  });


});
