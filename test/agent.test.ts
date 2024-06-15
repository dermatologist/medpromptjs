import { BaseAgent } from '../src';
import bootsrap from './bootstrap';

describe('BaseAgent', () => {
  let baseAgent: BaseAgent;

    beforeAll(async () => {
        const _container = await bootsrap();
        baseAgent = new BaseAgent(_container);
    });

  describe('camelize', () => {
    it('should correctly camelize strings', () => {
      expect(baseAgent.camelize('Test String')).toEqual('testString');
      expect(baseAgent.camelize('anotherTestString')).toEqual('anotherTestString');
    });
  });

  describe('name', () => {
    it('should correctly set the name of the agent', () => {
      expect(baseAgent.name).toEqual('baseAgent');
    });
  });

    describe('run', () => {
      const SECONDS = 1000;
        it('should correctly run the agent', async () => {
          const _input = {
            input: "Genrate a random number between 10 and 30",
            chat_history: [],
          }
            const result = await baseAgent.run(_input);
            console.log(result["output"]);
        }, 90 * SECONDS);
    });

});