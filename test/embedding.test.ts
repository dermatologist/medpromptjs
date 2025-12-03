import { BaseEmbedding } from '../src';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('BaseEmbedding', () => {
  let baseEmbedding: BaseEmbedding;

  beforeEach(() => {
    mockFetch.mockReset();
    baseEmbedding = new BaseEmbedding({
      baseUrl: 'http://localhost:8080/api/embeddings',
      model: 'test-embedding-model',
      apiKey: 'test-api-key',
    });
  });

  describe('constructor', () => {
    it('should initialize with required parameters', () => {
      expect(baseEmbedding.baseUrl).toBe(
        'http://localhost:8080/api/embeddings'
      );
      expect(baseEmbedding.model).toBe('test-embedding-model');
      expect(baseEmbedding.apiKey).toBe('test-api-key');
    });

    it('should handle empty apiKey', () => {
      const embeddingWithoutKey = new BaseEmbedding({
        baseUrl: 'http://localhost:8080/api/embeddings',
        model: 'test-model',
      });

      expect(embeddingWithoutKey.apiKey).toBe('');
    });
  });

  describe('embedDocuments', () => {
    it('should embed multiple documents', async () => {
      const mockEmbeddings = [
        [0.1, 0.2, 0.3],
        [0.4, 0.5, 0.6],
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ embeddings: mockEmbeddings }),
      });

      const result = await baseEmbedding.embedDocuments(['doc1', 'doc2']);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/embeddings',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-api-key',
          },
        })
      );

      expect(result).toEqual(mockEmbeddings);
    });

    it('should include correct payload structure', async () => {
      const mockEmbeddings = [[0.1, 0.2, 0.3]];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ embeddings: mockEmbeddings }),
      });

      await baseEmbedding.embedDocuments(['test document']);

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.model).toBe('test-embedding-model');
      expect(body.input).toEqual(['test document']);
    });
  });

  describe('embedQuery', () => {
    it('should embed a single query and return first embedding', async () => {
      const mockEmbeddings = [[0.1, 0.2, 0.3, 0.4, 0.5]];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ embeddings: mockEmbeddings }),
      });

      const result = await baseEmbedding.embedQuery('test query');

      expect(result).toEqual([0.1, 0.2, 0.3, 0.4, 0.5]);
    });

    it('should send the query as a single-element array', async () => {
      const mockEmbeddings = [[0.1, 0.2]];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ embeddings: mockEmbeddings }),
      });

      await baseEmbedding.embedQuery('single query');

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.input).toEqual(['single query']);
    });
  });

  describe('error handling', () => {
    it('should throw error on API failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Internal Server Error'),
      });

      await expect(baseEmbedding.embedDocuments(['test'])).rejects.toThrow(
        'API request failed: status=500; body=Internal Server Error'
      );
    });

    it('should throw error when embeddings key is missing', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: 'wrong format' }),
      });

      await expect(baseEmbedding.embedDocuments(['test'])).rejects.toThrow(
        "API response missing 'embeddings' key"
      );
    });

    it('should not include Authorization header when apiKey is empty', async () => {
      const embeddingWithoutKey = new BaseEmbedding({
        baseUrl: 'http://localhost:8080/api/embeddings',
        model: 'test-model',
      });

      const mockEmbeddings = [[0.1, 0.2, 0.3]];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ embeddings: mockEmbeddings }),
      });

      await embeddingWithoutKey.embedDocuments(['test']);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/embeddings',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });
  });
});
