import { BaseChain } from '../src';
import bootsrap from './bootstrap';

describe('BaseChain', () => {
  let baseChain: BaseChain;

  beforeAll(async () => {
    const _container = await bootsrap();
    baseChain = new BaseChain(_container, "baseChain", "base chain");
  });

  describe('camelize', () => {
    it('should correctly camelize strings', () => {
      expect(baseChain.camelize('Test String')).toEqual('testString');
      expect(baseChain.camelize('anotherTestString')).toEqual('anotherTestString');
    });
  });

  describe('name', () => {
    it('should correctly set the name of the agent', () => {
      expect(baseChain.name).toEqual('baseChain');
    });
  });

  describe('description', () => {
    it('should correctly set the description of the agent', () => {
      expect(baseChain.description).toEqual('base chain');
    });
  });

  describe('snake_case', () => {
    it('should correctly convert strings to snake_case', () => {
      expect(baseChain.snake_case('testString')).toEqual('test_string');
      expect(baseChain.snake_case('AnotherTestString')).toEqual('another_test_string');
    });
  });


  describe('chain', () => {
    const SECONDS = 1000;
    jest.setTimeout(90 * SECONDS);

    it('should correctly run the agent with mock data', async () => {
      const _input = {
        input: "DHTI is a framework for GenAI in healthcare.",
        chat_history: [],
      };

      // Mocking the chain method to return a predefined result
      const mockResult:any = { output: "DHTI stands for Digital Health Technology Integration." };
      jest.spyOn(baseChain, 'chain').mockResolvedValueOnce(mockResult);

      const result = await baseChain.chain(_input);
      expect(result).toEqual(mockResult);
    });
  });

  //e2e test
    //   describe('chain', () => {
    //   const SECONDS = 1000;
    //     it('should correctly run the agent', async () => {
    //       const _input = {
    //         input: "DHTI is a framework for GenAI in healthcare.",
    //         chat_history: [],
    //       };
    //         const result = await baseChain.chain(_input);
    //         console.log(result);
    //     }, 90 * SECONDS);
    // });
});