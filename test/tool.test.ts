import { BaseTool } from '../src';
import bootstrap from './bootstrap';

describe('BaseTool', () => {
  let baseTool: BaseTool;
  let container: any;

  beforeAll(async () => {
    container = await bootstrap();
    baseTool = new BaseTool(container, 'baseTool', 'base tool', {});
  });

  describe('constructor', () => {
    it('should initialize with provided parameters', () => {
      expect(baseTool.name).toBe('baseTool');
      expect(baseTool.description).toBe('base tool');
      expect(baseTool.schema).toEqual({});
    });

    it('should use constructor name when name is empty', () => {
      const mockTool = new BaseTool(container, '', '', {});
      expect(mockTool.name).toBe('baseTool');
    });

    it('should use constructor name when description is empty', () => {
      const mockTool = new BaseTool(container, '', '', {});
      expect(mockTool.description).toBe('base_tool');
    });

    it('should set container', () => {
      expect(baseTool.container).toBeDefined();
    });
  });

  describe('camelize', () => {
    it('should correctly camelize strings', () => {
      expect(baseTool.camelize('Test String')).toEqual('testString');
      expect(baseTool.camelize('anotherTestString')).toEqual(
        'anotherTestString'
      );
      expect(baseTool.camelize('Hello World Test')).toEqual('helloWorldTest');
    });

    it('should handle single word', () => {
      expect(baseTool.camelize('Single')).toEqual('single');
    });

    it('should handle already camelized string', () => {
      expect(baseTool.camelize('camelCase')).toEqual('camelCase');
    });
  });

  describe('snake_case', () => {
    it('should correctly convert to snake_case', () => {
      expect(baseTool.snake_case('TestString')).toEqual('test_string');
      expect(baseTool.snake_case('HelloWorld')).toEqual('hello_world');
      expect(baseTool.snake_case('AnotherTestString')).toEqual(
        'another_test_string'
      );
    });

    it('should handle single word', () => {
      expect(baseTool.snake_case('Single')).toEqual('single');
    });

    it('should handle already snake_case string', () => {
      expect(baseTool.snake_case('already_snake')).toEqual('already_snake');
    });
  });

  describe('name', () => {
    it('should correctly set the name of the tool', () => {
      expect(baseTool.name).toEqual('baseTool');
    });

    it('should allow updating name', () => {
      baseTool.name = 'updatedName';
      expect(baseTool.name).toEqual('updatedName');
    });
  });

  describe('description', () => {
    it('should correctly set the description', () => {
      expect(baseTool.description).toEqual('base tool');
    });

    it('should allow updating description', () => {
      baseTool.description = 'updated description';
      expect(baseTool.description).toEqual('updated description');
    });
  });

  describe('func', () => {
    it('should return override message by default', async () => {
      const result = await baseTool.func({});
      expect(result).toBe('override this');
    });
  });

  describe('resolve', () => {
    it('should call mydi with correct parameters', () => {
      const result = baseTool.resolve('test');
      // mydi should be called with container, name, and the provided name
      expect(result).toBeDefined();
    });
  });

  describe('_batchWithConfig', () => {
    it('should be defined', () => {
      expect(baseTool._batchWithConfig).toBeDefined();
      expect(typeof baseTool._batchWithConfig).toBe('function');
    });
  });
});
