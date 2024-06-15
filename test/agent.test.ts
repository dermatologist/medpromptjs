import { AgentExecutor, createStructuredChatAgent } from "langchain/agents";
import { BaseAgent } from "../src";
import mydi from "../src/mydi";

jest.mock("../src/mydi", () => jest.fn());
jest.mock("langchain/agents", () => ({
  createStructuredChatAgent: jest.fn(),
  AgentExecutor: jest.fn().mockImplementation(() => ({
    invoke: jest.fn().mockResolvedValue("mocked result"),
  })),
}));

describe('BaseAgent', () => {
  let baseAgent: BaseAgent;
  let mockContainer: any;

  beforeEach(() => {
    mockContainer = {};
    baseAgent = new BaseAgent(mockContainer);
  });

  test('constructor should initialize properties correctly', () => {
    expect(baseAgent.container).toBe(mockContainer);
    expect(baseAgent.name).toBe('baseAgent');
    // expect(baseAgent.tools).toBeDefined();
    // expect(baseAgent.prompt).toBeDefined();
    // expect(baseAgent.llm).toBeDefined();
  });

  test('resolve should return correct dependency', () => {
    const mockDependency = {};
    (mydi as jest.Mock).mockReturnValue(mockDependency);
    const result = baseAgent.resolve('testDependency');
    expect(result).toBe(mockDependency);
    expect(mydi).toHaveBeenCalledWith(mockContainer, 'baseAgent', 'testDependency');
  });

  test('camelize should return camelCase string', () => {
    expect(baseAgent.camelize('test string')).toBe('testString');
    expect(baseAgent.camelize('Test String')).toBe('testString');
  });

  test('snake_case should return snake_case string', () => {
    expect(baseAgent.snake_case('testString')).toBe('test_string');
    expect(baseAgent.snake_case('TestString')).toBe('test_string');
  });

  test('run should create agent, execute it, and return result', async () => {
    const input = { question: 'What is AI?' };
    const result = await baseAgent.run(input);
    expect(createStructuredChatAgent).toHaveBeenCalled();
    expect(AgentExecutor).toHaveBeenCalled();
    expect(result).toBe('mocked result');
  });

    // // e2e test
    // describe('run', () => {
    //   const SECONDS = 1000;
    //     it('should correctly run the agent', async () => {
    //       const _input = {
    //         input: "Genrate a random number between 10 and 30",
    //         chat_history: [],
    //       }
    //         const result = await baseAgent.run(_input);
    //         console.log(result["output"]);
    //     }, 90 * SECONDS);
    // });
});