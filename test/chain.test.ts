import { BaseChain } from '../src';
import bootstrap from './bootstrap';

describe('BaseChain', () => {
  let baseChain: BaseChain;

  beforeAll(async () => {
    const _container = await bootstrap();
    baseChain = new BaseChain(_container);
  });

  it('should initialize with default values', () => {
    expect(baseChain.name).toBe('baseChain');
    expect(baseChain.description).toBe('base_chain');
    expect(baseChain.template).toBe('{input}');
    expect(baseChain.chat_model).toBe(false);
  });

  it('should allow setting name', () => {
    baseChain.name = 'TestChain';
    expect(baseChain.name).toBe('TestChain');
  });

  it('should allow setting description', () => {
    baseChain.description = 'This is a test chain';
    expect(baseChain.description).toBe('This is a test chain');
  });

  it('should allow setting template', () => {
    baseChain.template = 'This is a test template';
    expect(baseChain.template).toBe('This is a test template');
    expect(baseChain.prompt).toBeDefined();
  });
});
