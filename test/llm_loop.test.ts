import { LLMLoop } from '../src';
import bootstrap from './bootstrap';

describe('LLMLoop', () => {
  let llmLoop: LLMLoop;
  let container: any;

  beforeAll(async () => {
    container = await bootstrap();
    llmLoop = new LLMLoop(container);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Add tests for getters and setters
  it('should set and get mapQueryTemplate', () => {
    llmLoop.mapQueryTemplate = 'test-template';
    expect(llmLoop.mapQueryTemplate).toBe('test-template');
  });

  it('should set and get mapDocTemplate', () => {
    llmLoop.mapDocTemplate = 'test-doc-template';
    expect(llmLoop.mapDocTemplate).toBe('test-doc-template');
  });

  it('should set and get reduceChainTemplate', () => {
    llmLoop.reduceChainTemplate = 'test-reduce-template';
    expect(llmLoop.reduceChainTemplate).toBe('test-reduce-template');
  });

  it('should initialize with default values', () => {
    expect(llmLoop.name).toBe('lLMLoop');
    expect(llmLoop.description).toBe('l_l_m_loop');
    expect(llmLoop.template).toBe('{baseloop}');
    expect(llmLoop.chat_model).toBe(false);
  });

  it('should resolve dependencies', () => {
    expect(llmLoop.llm).toBeDefined();
  });
});
