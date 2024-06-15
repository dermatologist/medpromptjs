import { BaseTool } from '../src';
import bootstrap from './bootstrap';

describe('BaseTool', () => {
  let baseTool: BaseTool;

    beforeAll(async () => {
        const _container = await bootstrap();
        baseTool = new BaseTool(_container, "baseTool", "base tool", {});
    });

      describe('camelize', () => {
    it('should correctly camelize strings', () => {
      expect(baseTool.camelize('Test String')).toEqual('testString');
      expect(baseTool.camelize('anotherTestString')).toEqual('anotherTestString');
    });
  });

  describe('name', () => {
    it('should correctly set the name of the agent', () => {
      expect(baseTool.name).toEqual('baseTool');
    });
  });



});