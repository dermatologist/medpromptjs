import { BaseChain } from '../src/chain';
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

    describe('chain', () => {
      const SECONDS = 1000;
        it('should correctly run the agent', async () => {
          const _input = {
            input: "DHTI is a framework for GenAI in healthcare.",
            chat_history: [],
          };
            const result = await baseChain.chain(_input);
            console.log(result);
        }, 90 * SECONDS);
    });

});