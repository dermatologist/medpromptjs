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

  it('should initialize with default values', () => {
    expect(llmLoop.name).toBe('lLMLoop');
    expect(llmLoop.description).toBe('l_l_m_loop');
    expect(llmLoop.template).toBe('{{input}}');
    expect(llmLoop.chat_model).toBe(false);
  });

  it('should resolve dependencies using mydi', () => {
    llmLoop.resolve('test-llm');
    expect(mydi).toHaveBeenCalledWith(mockContainer, 'lLMLoop', 'test-llm');
    expect(llmLoop.llm).toBeUndefined(); // llm is not set in this test
    expect(llmLoop.chat_model).toBe(false);
  });
});



