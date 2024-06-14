import { BaseChain } from '../src/chain';
import bootsrap from './bootstrap';

describe('BaseChain', () => {
  let baseChain: BaseChain;

    beforeAll(async () => {
        const _container = await bootsrap();
        baseChain = new BaseChain(_container, "base_chain", "base chain");
    });

      describe('camelize', () => {
    it('should correctly camelize strings', () => {
      expect(baseChain.camelize('Test String')).toEqual('testString');
      expect(baseChain.camelize('anotherTestString')).toEqual('anotherTestString');
    });
  });

  describe('name', () => {
    it('should correctly set the name of the agent', () => {
      expect(baseChain.name).toEqual('base_chain');
    });
  });

    describe('chain', () => {
      const SECONDS = 1000;
        it('should correctly run the agent', async () => {
          const _input = {
            input: "Genrate a random number between 10 and 30",
            chat_history: [],
          }
            const result = await baseChain.chain(_input);
        }, 90 * SECONDS);
    });

});