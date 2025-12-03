import { LLMLoop } from '../src';
import mydi from '../src/mydi';

jest.mock('../src/mydi', () => jest.fn());

describe('LLMLoop', () => {
  let llmLoop: LLMLoop;
  let mockContainer: any;

  beforeEach(() => {
    mockContainer = {};
    llmLoop = new LLMLoop(mockContainer);
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
    expect(llmLoop.template).toBe('{{input}}');
    expect(llmLoop.chat_model).toBe(false);
  });

  it('should resolve dependencies using mydi', () => {
    llmLoop.resolve('test-llm');
    expect(mydi).toHaveBeenCalledWith(mockContainer, 'lLMLoop', 'test-llm');
    expect(llmLoop.llm).toBeNull(); // llm is not set in this test
    expect(llmLoop.chat_model).toBe(false);
  });
});
