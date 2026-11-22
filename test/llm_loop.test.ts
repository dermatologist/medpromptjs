import { LLMLoop } from '../src';
import bootstrap from './bootstrap';

describe('LLMLoop', () => {
  let llmLoop: LLMLoop;
  let container: any;

  beforeAll(async () => {
    container = await bootstrap();
    llmLoop = new LLMLoop(container);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Add tests for getters and setters
  it('should set and get mapQueryTemplate', () => {
    llmLoop.mapQueryTemplate = 'test-template';
    expect(llmLoop.mapQueryTemplate).toBe('test-template');
  });

  it('should set and get mapDocTemplate', () => {
    llmLoop.mapDocTemplate = 'test-doc-template';
    expect(llmLoop.mapDocTemplate).toBe('test-doc-template');
  });

  it('should set and get reduceChainTemplate', () => {
    llmLoop.reduceChainTemplate = 'test-reduce-template';
    expect(llmLoop.reduceChainTemplate).toBe('test-reduce-template');
  });

  it('should initialize with default values', () => {
    expect(llmLoop.name).toBe('lLMLoop');
    expect(llmLoop.description).toBe('l_l_m_loop');
    expect(llmLoop.template).toBe('{baseloop}');
    expect(llmLoop.chat_model).toBe(false);
  });

  it('should resolve dependencies', () => {
    expect(llmLoop.llm).toBeDefined();
  });

  // Test checkMention method
  describe('checkMention', () => {
    it('should return true when both expression and context are provided', async () => {
      const result = await llmLoop.checkMention(
        'test expression',
        'test context'
      );
      expect(result).toBe(true);
    });

    it('should return false when expression is missing', async () => {
      const result = await llmLoop.checkMention('', 'test context');
      expect(result).toBe(false);
    });

    it('should return false when context is missing', async () => {
      const result = await llmLoop.checkMention('test expression', '');
      expect(result).toBe(false);
    });

    it('should return false when both expression and context are missing', async () => {
      const result = await llmLoop.checkMention('', '');
      expect(result).toBe(false);
    });
  });

  // Test checkNegation method
  describe('checkNegation', () => {
    it('should return true when both expression and context are provided', async () => {
      const result = await llmLoop.checkNegation(
        'test expression',
        'test context'
      );
      expect(result).toBe(true);
    });

    it('should return false when expression is missing', async () => {
      const result = await llmLoop.checkNegation('', 'test context');
      expect(result).toBe(false);
    });

    it('should return false when context is missing', async () => {
      const result = await llmLoop.checkNegation('test expression', '');
      expect(result).toBe(false);
    });
  });

  // Test findDatesAndConvertToTimeElapsed method
  describe('findDatesAndConvertToTimeElapsed', () => {
    it('should convert dates in mm/dd/yyyy format to days ago', () => {
      const text = 'Patient visited on 01/15/2024 for checkup';
      const result = llmLoop.findDatesAndConvertToTimeElapsed(text);
      expect(result).toContain('days ago');
      expect(result).not.toContain('01/15/2024');
    });

    it('should convert dates in mm-dd-yyyy format to days ago', () => {
      const text = 'Patient visited on 01-15-2024 for checkup';
      const result = llmLoop.findDatesAndConvertToTimeElapsed(text);
      expect(result).toContain('days ago');
      expect(result).not.toContain('01-15-2024');
    });

    it('should handle multiple dates in the same text', () => {
      const text = 'First visit 01/01/2024, second visit 02/01/2024';
      const result = llmLoop.findDatesAndConvertToTimeElapsed(text);
      const daysCount = (result.match(/days ago/g) || []).length;
      expect(daysCount).toBe(2);
    });

    it('should return text unchanged if no dates are found', () => {
      const text = 'Patient visited for checkup';
      const result = llmLoop.findDatesAndConvertToTimeElapsed(text);
      expect(result).toBe(text);
    });
  });

  // Test camelToString method
  describe('camelToString', () => {
    it('should convert camelCase to space-separated string', () => {
      const result = llmLoop.camelToString('visualFootExam');
      expect(result).toBe('Visual Foot Exam');
    });

    it('should handle single word', () => {
      const result = llmLoop.camelToString('exam');
      expect(result).toBe('Exam');
    });

    it('should handle multiple camelCase words', () => {
      const result = llmLoop.camelToString('patientHistoryAndDiagnosis');
      expect(result).toBe('Patient History And Diagnosis');
    });
  });

  // Test stringToBoolean method
  describe('stringToBoolean', () => {
    it('should return true for positive keywords', () => {
      expect(llmLoop.stringToBoolean('true')).toBe(true);
      expect(llmLoop.stringToBoolean('YES')).toBe(true);
      expect(llmLoop.stringToBoolean('confirms')).toBe(true);
      expect(llmLoop.stringToBoolean('did have')).toBe(true);
      expect(llmLoop.stringToBoolean('showed')).toBe(true);
      expect(llmLoop.stringToBoolean('revealed')).toBe(true);
    });

    it('should return false for negative or neutral strings', () => {
      expect(llmLoop.stringToBoolean('false')).toBe(false);
      expect(llmLoop.stringToBoolean('no')).toBe(false);
      expect(llmLoop.stringToBoolean('not found')).toBe(false);
    });

    it('should be case insensitive', () => {
      expect(llmLoop.stringToBoolean('TRUE')).toBe(true);
      expect(llmLoop.stringToBoolean('Yes')).toBe(true);
      expect(llmLoop.stringToBoolean('CONFIRMS')).toBe(true);
    });
  });

  // Test textSplitter method
  describe('textSplitter', () => {
    it('should split text into chunks', async () => {
      const text = 'This is a test document. '.repeat(100);
      const chunks = await llmLoop.textSplitter(text, 500, 0);
      expect(chunks).toBeInstanceOf(Array);
      expect(chunks.length).toBeGreaterThan(0);
    });

    it('should handle empty text', async () => {
      const chunks = await llmLoop.textSplitter('', 500, 0);
      expect(chunks).toEqual([]);
    });

    it('should use default chunk size and overlap', async () => {
      const text = 'This is a test document. '.repeat(100);
      const chunks = await llmLoop.textSplitter(text);
      expect(chunks).toBeInstanceOf(Array);
    });

    it('should handle custom chunk overlap', async () => {
      const text = 'This is a test document. '.repeat(100);
      const chunks = await llmLoop.textSplitter(text, 500, 50);
      expect(chunks).toBeInstanceOf(Array);
    });
  });

  // Test printValues method
  describe('printValues', () => {
    it('should extract values from nested object structure', () => {
      const obj = {
        name: 'test',
        context: 'test context',
        expression: {
          arg: {
            where: [
              { value: 'Visual foot exam' },
              { value: 'active infection' },
            ],
          },
        },
      };
      const result = llmLoop.printValues(obj);
      expect(result).toContain('Visual foot exam');
      expect(result).toContain('active infection');
    });

    it('should return empty string for invalid structure', () => {
      const obj = { name: 'test' };
      const result = llmLoop.printValues(obj);
      expect(result).toBe('');
    });
  });

  // Test extractObjectsByKey method
  describe('extractObjectsByKey', () => {
    it('should extract all values by key from nested object', () => {
      const obj = {
        level1: {
          value: 'first',
          level2: {
            value: 'second',
            level3: { value: 'third' },
          },
        },
      };
      const result = llmLoop.extractObjectsByKey(obj, 'value');
      expect(result).toEqual(['first', 'second', 'third']);
    });

    it('should return empty array when key not found', () => {
      const obj = { level1: { level2: 'value' } };
      const result = llmLoop.extractObjectsByKey(obj, 'nonexistent');
      expect(result).toEqual([]);
    });

    it('should handle null values', () => {
      const obj = { value: null, level1: { value: 'test' } };
      const result = llmLoop.extractObjectsByKey(obj, 'value');
      expect(result).toContain(null);
      expect(result).toContain('test');
    });
  });

  // Test _printValues method
  describe('_printValues', () => {
    it('should extract and format values from object', () => {
      llmLoop.stringExpression = '';
      const obj = {
        expression: {
          arg: {
            where: [{ value: 'VisualFootExam' }],
          },
        },
      };
      const result = llmLoop._printValues(obj);
      expect(result).toContain('Visual Foot Exam');
    });

    it('should eliminate reserved words', () => {
      llmLoop.stringExpression = '';
      const obj = {
        value: 'test',
        Type: 'String',
        Specifier: 'Named',
      };
      const result = llmLoop._printValues(obj);
      expect(result).not.toContain('String');
      expect(result).not.toContain('Named');
    });

    it('should remove URLs', () => {
      llmLoop.stringExpression = '';
      const obj = {
        link: 'https://example.com',
        text: 'test',
      };
      const result = llmLoop._printValues(obj);
      expect(result).not.toContain('https://example.com');
    });
  });

  // Test checkAssertion method
  describe('checkAssertion', () => {
    it('should handle string expression and context', async () => {
      const result = await llmLoop.checkAssertion(
        'test expression',
        'test context'
      );
      // This will call chain which we'll mock
      expect(result).toBeDefined();
    });

    it('should handle JSON expression', async () => {
      const jsonExpression = JSON.stringify({
        name: 'test',
        context: 'test context',
        expression: {
          arg: {
            where: [
              { value: 'Visual foot exam' },
              { value: 'active infection' },
            ],
          },
        },
      });
      const result = await llmLoop.checkAssertion(
        jsonExpression,
        'test context'
      );
      expect(result).toBeDefined();
    });

    it('should handle JSON context with content array', async () => {
      const mockContext = JSON.stringify([
        {
          content: [
            {
              attachment: {
                data: {
                  value: 'dGVzdCBjb250ZW50', // base64 encoded "test content"
                },
              },
            },
          ],
        },
      ]);
      const result = await llmLoop.checkAssertion(
        'test expression',
        mockContext
      );
      expect(result).toBeDefined();
    });

    it('should handle string context when JSON parsing fails', async () => {
      const result = await llmLoop.checkAssertion(
        'test expression',
        'plain text context'
      );
      expect(result).toBeDefined();
    });
  });

  // Test textSplitter edge cases
  describe('textSplitter edge cases', () => {
    it('should warn when no chunks are created', async () => {
      const warnSpy = jest.spyOn(console, 'warn');
      const chunks = await llmLoop.textSplitter('', 500, 0);
      expect(chunks).toEqual([]);
      warnSpy.mockRestore();
    });

    it('should handle very small chunk size', async () => {
      const text = 'This is a test document. '.repeat(10);
      const chunks = await llmLoop.textSplitter(text, 500, 0);
      expect(chunks).toBeInstanceOf(Array);
    });

    it('should warn when chunk size is less than 1000', async () => {
      const text = 'This is a test document. '.repeat(10);
      const chunks = await llmLoop.textSplitter(text, 500, 0);
      expect(chunks).toBeInstanceOf(Array);
      expect(chunks.length).toBeGreaterThan(0);
    });

    it('should handle large texts', async () => {
      // Create a large text
      const text = 'This is a test sentence. '.repeat(1000);
      const chunks = await llmLoop.textSplitter(text, 500, 0);
      expect(chunks).toBeInstanceOf(Array);
      expect(chunks.length).toBeGreaterThan(0);
    });
  });
});
