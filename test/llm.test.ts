import { BaseLLM } from '../src';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('BaseLLM', () => {
  let baseLLM: BaseLLM;

  beforeEach(() => {
    mockFetch.mockReset();
    baseLLM = new BaseLLM({
      baseUrl: 'http://localhost:8080/api/chat',
      model: 'test-model',
      apiKey: 'test-api-key',
    });
  });

  describe('constructor', () => {
    it('should initialize with required parameters', () => {
      expect(baseLLM.baseUrl).toBe('http://localhost:8080/api/chat');
      expect(baseLLM.model).toBe('test-model');
      expect(baseLLM.apiKey).toBe('test-api-key');
    });

    it('should initialize with default values', () => {
      expect(baseLLM.timeout).toBe(60000);
      expect(baseLLM.backend).toBe('dhti');
      expect(baseLLM.temperature).toBe(0.1);
      expect(baseLLM.topP).toBe(0.8);
      expect(baseLLM.topK).toBe(40);
      expect(baseLLM.nBatch).toBe(8);
      expect(baseLLM.nThreads).toBe(4);
      expect(baseLLM.nPredict).toBe(256);
      expect(baseLLM.maxOutputTokens).toBe(512);
      expect(baseLLM.repeatLastN).toBe(64);
      expect(baseLLM.repeatPenalty).toBe(1.18);
    });

    it('should allow overriding default values', () => {
      const customLLM = new BaseLLM({
        baseUrl: 'http://localhost:8080/api/chat',
        model: 'custom-model',
        temperature: 0.5,
        topP: 0.9,
        maxOutputTokens: 1024,
      });

      expect(customLLM.temperature).toBe(0.5);
      expect(customLLM.topP).toBe(0.9);
      expect(customLLM.maxOutputTokens).toBe(1024);
    });

    it('should handle empty apiKey', () => {
      const llmWithoutKey = new BaseLLM({
        baseUrl: 'http://localhost:8080/api/chat',
        model: 'test-model',
      });

      expect(llmWithoutKey.apiKey).toBe('');
    });
  });

  describe('_llmType', () => {
    it('should return "dhti"', () => {
      expect(baseLLM._llmType()).toBe('dhti');
    });
  });

  describe('modelDefaultParameters', () => {
    it('should return correct model parameters', () => {
      const params = baseLLM.modelDefaultParameters;

      expect(params.maxOutputTokens).toBe(512);
      expect(params.nPredict).toBe(256);
      expect(params.topK).toBe(40);
      expect(params.topP).toBe(0.8);
      expect(params.temperature).toBe(0.1);
      expect(params.nBatch).toBe(8);
      expect(params.repeatPenalty).toBe(1.18);
      expect(params.repeatLastN).toBe(64);
    });
  });

  describe('identifyingParams', () => {
    it('should return correct identifying parameters', () => {
      const params = baseLLM.identifyingParams;

      expect(params.model).toBe('test-model');
      expect(params.baseUrl).toBe('http://localhost:8080/api/chat');
      expect(params.modelParameters).toBeDefined();
    });
  });

  describe('_call', () => {
    it('should make API call and return content from choices[0].message.content', async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              role: 'assistant',
              content: 'Hello, this is a test response!',
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await baseLLM.invoke('Test prompt');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/chat',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-api-key',
          },
        })
      );

      expect(result).toBe('Hello, this is a test response!');
    });

    it('should return content from choices[0].text when message is not present', async () => {
      const mockResponse = {
        choices: [
          {
            text: 'Direct text response',
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await baseLLM.invoke('Test prompt');

      expect(result).toBe('Direct text response');
    });

    it('should return raw JSON when response format is unexpected', async () => {
      const mockResponse = {
        unexpected: 'format',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await baseLLM.invoke('Test prompt');

      expect(result).toBe(JSON.stringify(mockResponse));
    });

    it('should throw error on API failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Internal Server Error'),
      });

      await expect(baseLLM.invoke('Test prompt')).rejects.toThrow(
        'API request failed: status=500; body=Internal Server Error'
      );
    });

    it('should not include Authorization header when apiKey is empty', async () => {
      const llmWithoutKey = new BaseLLM({
        baseUrl: 'http://localhost:8080/api/chat',
        model: 'test-model',
      });

      const mockResponse = {
        choices: [
          {
            message: {
              content: 'Response without auth',
            },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      await llmWithoutKey.invoke('Test prompt');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/chat',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });

    it('should include correct payload structure', async () => {
      const mockResponse = {
        choices: [{ message: { content: 'Response' } }],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      await baseLLM.invoke('Test prompt');

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.model).toBe('test-model');
      expect(body.messages).toEqual([{ role: 'user', content: 'Test prompt' }]);
      expect(body.options).toBeDefined();
      expect(body.options.temperature).toBe(0.1);
    });
  });
});
