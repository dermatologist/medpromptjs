import { LLMLoop } from '../../src/llm_loop/base';
import bootstrap from '../bootstrap';

describe('LLMLoop', () => {
  let llmLoop: LLMLoop;

  beforeAll(async () => {
    const _container = await bootstrap();
    llmLoop = new LLMLoop(_container, '', '');
  });

  it('should create an instance of LLMLoop', () => {
    expect(llmLoop).toBeTruthy();
  });

  // Add more tests for LLMLoop methods

  it('should have a default name', () => {
    expect(llmLoop.name).toBe('LLMLoop');
  });

  it('should have a default description', () => {
    expect(llmLoop.description).toBe('Base LLM Loop.');
  });

  it('should have a default string_expression', () => {
    expect(llmLoop.string_expression).toBe('');
  });

  // it('should check assertion correctly', async () => {
  //   const result = await llmLoop.checkAssertion('test', {});
  //   expect(result).toBe(true);
  // });

  // it('should check mention correctly', async () => {
  //   const result = await llmLoop.checkMention('test', {});
  //   expect(result).toBe(true);
  // });

  // it('should check negation correctly', async () => {
  //   const result = await llmLoop.checkNegation('test', {});
  //   expect(result).toBe(true);
  // });

  it('should find dates and convert to time elapsed', () => {
    const text = 'The event was on 01/01/2020.';
    const result = llmLoop.findDatesAndConvertToTimeElapsed(text);
    expect(result).toContain('days ago');
  });

  it('should convert camelCase to string', () => {
    const camelCase = 'camelCaseString';
    const result = llmLoop.camelToString(camelCase);
    expect(result).toBe('Camel Case String');
  });

  it('should print values correctly', () => {
    const obj = { a: 1, b: { c: 2, d: 3 } };
    llmLoop.printValues(obj);
    expect(llmLoop.string_expression).toContain('1 2 3');
  });

  it('should eliminate unwanted values', () => {
    const obj = { a: 'true', b: 'false', c: null, d: undefined };
    llmLoop.printValues(obj);
    expect(llmLoop.string_expression).not.toContain('true');
    expect(llmLoop.string_expression).not.toContain('false');
    expect(llmLoop.string_expression).not.toContain('null');
    expect(llmLoop.string_expression).not.toContain('undefined');
  });
});
