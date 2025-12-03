import { BaseAgent } from '../src';
import bootstrap from './bootstrap';

jest.mock('langchain/agents', () => ({
  createStructuredChatAgent: jest.fn(),
  AgentExecutor: jest.fn().mockImplementation(() => ({
    invoke: jest.fn().mockResolvedValue('mocked result'),
  })),
}));

describe('BaseAgent', () => {
  let baseAgent: BaseAgent;
  let container: any;

  beforeAll(async () => {
    container = await bootstrap();
    baseAgent = new BaseAgent(container);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    expect(baseAgent.name).toBe('baseAgent');
    expect(baseAgent.description).toBe('base_agent');
    expect(baseAgent.template).toBe('{baseagent}');
    expect(baseAgent.chat_model).toBe(false);
  });

  it('should resolve dependencies', () => {
    expect(baseAgent.llm).toBeDefined();
  });
});
