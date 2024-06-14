import { BaseAgent } from '../src/agent';
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
      expect(baseAgent.name).toEqual('base_agent');
    });
  });

    describe('run', () => {
      const SECONDS = 1000;
        it('should correctly run the agent', async () => {
            const result = await baseAgent.run('Tell me a joke about cats');
            // console.log(JSON.stringify(result));
            // expect(result).toEqual(expect.any(String));
        }, 90 * SECONDS);
    });

});