import { BaseAgent } from '../src';
import mydi from '../src/mydi';

jest.mock('../src/mydi', () => jest.fn());
jest.mock('langchain/agents', () => ({
  createStructuredChatAgent: jest.fn(),
  AgentExecutor: jest.fn().mockImplementation(() => ({
    invoke: jest.fn().mockResolvedValue('mocked result'),
  })),
}));

describe('BaseAgent', () => {
  let baseAgent: BaseAgent;
  let mockContainer: any;

  beforeEach(() => {
    mockContainer = {};
    baseAgent = new BaseAgent(mockContainer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    expect(baseAgent.name).toBe('baseAgent');
    expect(baseAgent.description).toBe('base_agent');
    expect(baseAgent.template).toContain('## Question: {question}');
    expect(baseAgent.chat_model).toBe(false);
  });

  it('should resolve dependencies using mydi', () => {
    baseAgent.resolve('test-llm');
    expect(mydi).toHaveBeenCalledWith(mockContainer, 'baseAgent', 'test-llm');
    expect(baseAgent.llm).toBeNull(); // llm is not set in this test
    expect(baseAgent.chat_model).toBe(false);
  });
});
