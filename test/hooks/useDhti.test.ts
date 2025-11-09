import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useDhti } from '../../src/hooks/useDhti';
import { CDSHookCard } from '../../src/models/card';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useDhti', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useDhti());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.submitMessage).toBe('function');
  });

  it('should submit a message successfully and return a card', async () => {
    const mockCard = {
      summary: 'Test Summary',
      detail: 'Test Detail',
      indicator: 'info' as const,
    };

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        cards: [mockCard],
      },
    });

    const { result } = renderHook(() => useDhti());

    let card: any;
    await act(async () => {
      card = await result.current.submitMessage('Test message');
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      '/langserve/dhti_elixir_template/cds-services/dhti-service',
      expect.objectContaining({
        input: expect.objectContaining({
          input: expect.objectContaining({
            context: { input: 'Test message' },
          }),
        }),
        config: {},
        kwargs: {},
      })
    );

    expect(card).toBeInstanceOf(CDSHookCard);
    expect(card?.summary).toBe('Test Summary');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should use custom service when provided', async () => {
    const mockCard = {
      summary: 'Custom Service Response',
    };

    mockedAxios.post.mockResolvedValueOnce({
      data: { cards: [mockCard] },
    });

    const { result } = renderHook(() => useDhti());

    await act(async () => {
      await result.current.submitMessage('Test message', 'custom_service');
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      '/langserve/custom_service/cds-services/dhti-service',
      expect.any(Object)
    );
  });

  it('should handle response that is directly a card', async () => {
    const mockCard = {
      summary: 'Direct Card Response',
      detail: 'This is a direct card',
    };

    mockedAxios.post.mockResolvedValueOnce({
      data: mockCard,
    });

    const { result } = renderHook(() => useDhti());

    let card: any;
    await act(async () => {
      card = await result.current.submitMessage('Test message');
    });

    expect(card).toBeInstanceOf(CDSHookCard);
    expect(card?.summary).toBe('Direct Card Response');
  });

  it('should handle errors and set error state', async () => {
    const errorMessage = 'Network error occurred';
    mockedAxios.post.mockRejectedValueOnce({
      message: errorMessage,
    });

    const { result } = renderHook(() => useDhti());

    let card: any;
    await act(async () => {
      card = await result.current.submitMessage('Test message');
    });

    expect(card).toBe(null);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
  });

  it('should handle errors with response data', async () => {
    const errorMessage = 'Server error';
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });

    const { result } = renderHook(() => useDhti());

    let card: any;
    await act(async () => {
      card = await result.current.submitMessage('Test message');
    });

    expect(card).toBe(null);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should return null when response has no cards', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {},
    });

    const { result } = renderHook(() => useDhti());

    let card: any;
    await act(async () => {
      card = await result.current.submitMessage('Test message');
    });

    expect(card).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('should set loading to true during submission', async () => {
    mockedAxios.post.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: { cards: [] } }), 100)
        )
    );

    const { result } = renderHook(() => useDhti());

    act(() => {
      result.current.submitMessage('Test message');
    });

    // Check loading state is true immediately after calling submitMessage
    expect(result.current.loading).toBe(true);

    // Wait for the promise to resolve
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
