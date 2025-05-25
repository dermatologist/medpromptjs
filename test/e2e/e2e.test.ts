import { LLMLoop } from '../../src/llm_loop/base';
import bootstrap from './bootstrap';

jest.setTimeout(60000);

describe('LLMLoop', () => {
  let llmLoop: LLMLoop;

  beforeAll(async () => {
    const _container = await bootstrap();
    llmLoop = new LLMLoop(_container, '', '');
  });


  it('should check assertion correctly', async () => {
    const cql = `
     exists (
        [DocumentReference] D
        where D.allergies="Penicillin"
        and D.complaint="Headache"
        and D.complaint="Weakness" or D.complaint="Numbness"
        and D.findings="Intact sensation to light touch"
        )
      `

    const result = await llmLoop.checkAssertion(cql, {});
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
