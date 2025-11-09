import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConversationContainer } from '../../src/components/ConversationContainer';
import { useDhti } from '../../src/hooks/useDhti';
import { CDSHookCard } from '../../src/models/card';

// Mock the useDhti hook
jest.mock('../../src/hooks/useDhti');
const mockedUseDhti = useDhti as jest.MockedFunction<typeof useDhti>;

describe('ConversationContainer', () => {
  const mockSubmitMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseDhti.mockReturnValue({
      submitMessage: mockSubmitMessage,
      loading: false,
      error: null,
    });
  });

  it('should render the conversation container', () => {
    render(<ConversationContainer />);
    expect(screen.getByText(/Healthcare Conversational Interface/i)).toBeInTheDocument();
  });

  it('should render service input with default value', () => {
    render(<ConversationContainer />);
    const serviceInput = screen.getByLabelText(/Service:/i);
    expect(serviceInput).toHaveValue('dhti_elixir_template');
  });

  it('should render message input and clear button', () => {
    render(<ConversationContainer />);
    expect(screen.getByPlaceholderText(/Type your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Clear Conversation/i })).toBeInTheDocument();
  });

  it('should handle message submission', async () => {
    const mockCard = new CDSHookCard({
      summary: 'Response Summary',
    });

    mockSubmitMessage.mockResolvedValue(mockCard);

    render(<ConversationContainer />);

    const input = screen.getByPlaceholderText(/Type your message/i);
    const button = screen.getByRole('button', { name: /Send/i });

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSubmitMessage).toHaveBeenCalledWith('Hello', 'dhti_elixir_template');
    });

    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getAllByText('Response Summary').length).toBeGreaterThan(0);
    });
  });

  it('should handle message submission with custom service', async () => {
    const mockCard = new CDSHookCard({
      summary: 'Custom Service Response',
    });

    mockSubmitMessage.mockResolvedValue(mockCard);

    render(<ConversationContainer />);

    const serviceInput = screen.getByLabelText(/Service:/i);
    fireEvent.change(serviceInput, { target: { value: 'custom_service' } });

    const messageInput = screen.getByPlaceholderText(/Type your message/i);
    const sendButton = screen.getByRole('button', { name: /Send/i });

    fireEvent.change(messageInput, { target: { value: 'Test' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockSubmitMessage).toHaveBeenCalledWith('Test', 'custom_service');
    });
  });

  it('should clear conversation when clear button is clicked', async () => {
    const mockCard = new CDSHookCard({
      summary: 'Response',
    });

    mockSubmitMessage.mockResolvedValue(mockCard);

    render(<ConversationContainer />);

    // Add a message
    const messageInput = screen.getByPlaceholderText(/Type your message/i);
    const sendButton = screen.getByRole('button', { name: /Send/i });

    fireEvent.change(messageInput, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    // Clear conversation
    const clearButton = screen.getByRole('button', { name: /Clear Conversation/i });
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.queryByText('Hello')).not.toBeInTheDocument();
    });
  });

  it('should display loading state', () => {
    mockedUseDhti.mockReturnValue({
      submitMessage: mockSubmitMessage,
      loading: true,
      error: null,
    });

    render(<ConversationContainer />);
    expect(screen.getByText(/Sending message.../i)).toBeInTheDocument();
  });

  it('should display error message', () => {
    mockedUseDhti.mockReturnValue({
      submitMessage: mockSubmitMessage,
      loading: false,
      error: 'Network error',
    });

    render(<ConversationContainer />);
    expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument();
  });

  it('should disable inputs when loading', () => {
    mockedUseDhti.mockReturnValue({
      submitMessage: mockSubmitMessage,
      loading: true,
      error: null,
    });

    render(<ConversationContainer />);

    expect(screen.getByLabelText(/Service:/i)).toBeDisabled();
    expect(screen.getByPlaceholderText(/Type your message/i)).toBeDisabled();
  });

  it('should disable clear button when no messages', () => {
    render(<ConversationContainer />);
    const clearButton = screen.getByRole('button', { name: /Clear Conversation/i });
    expect(clearButton).toBeDisabled();
  });

  it('should handle null response from service', async () => {
    mockSubmitMessage.mockResolvedValue(null);

    render(<ConversationContainer />);

    const messageInput = screen.getByPlaceholderText(/Type your message/i);
    const sendButton = screen.getByRole('button', { name: /Send/i });

    fireEvent.change(messageInput, { target: { value: 'Test' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('No response received')).toBeInTheDocument();
    });
  });
});
