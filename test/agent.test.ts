import { BaseAgent } from '../src';
import bootstrap from './bootstrap';

jest.mock('@langchain/classic/agents', () => ({
  createStructuredChatAgent: jest.fn(() => ({})),
  AgentExecutor: jest.fn(() => ({
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

  describe('tools getter and setter', () => {
    it('should get empty tools array by default', () => {
      expect(baseAgent.tools).toEqual([]);
    });

    it('should set and get tools', () => {
      const mockTools = [{ name: 'tool1' }, { name: 'tool2' }];
      baseAgent.tools = mockTools;
      expect(baseAgent.tools).toEqual(mockTools);
    });
  });

  describe('run method', () => {
    it('should run agent with input', async () => {
      const mockInput = { input: 'test input' };
      const result = await baseAgent.run(mockInput);
      expect(result).toBe('mocked result');
    });

    it('should handle different input types', async () => {
      const mockInput = { input: 'another test' };
      const result = await baseAgent.run(mockInput);
      expect(result).toBe('mocked result');
    });
  });
});
