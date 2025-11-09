import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessageInput } from '../../src/components/MessageInput';

describe('MessageInput', () => {
  it('should render input field and submit button', () => {
    const mockOnSubmit = jest.fn();
    render(<MessageInput onSubmit={mockOnSubmit} />);

    expect(
      screen.getByPlaceholderText(/Type your message/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument();
  });

  it('should handle text input', () => {
    const mockOnSubmit = jest.fn();
    render(<MessageInput onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/Type your message/i);
    fireEvent.change(input, { target: { value: 'Test message' } });

    expect(input).toHaveValue('Test message');
  });

  it('should call onSubmit with message when submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<MessageInput onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/Type your message/i);
    const button = screen.getByRole('button', { name: /Send/i });

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(button);

    expect(mockOnSubmit).toHaveBeenCalledWith('Test message');
  });

  it('should clear input after submission', () => {
    const mockOnSubmit = jest.fn();
    render(<MessageInput onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/Type your message/i);
    const button = screen.getByRole('button', { name: /Send/i });

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(button);

    expect(input).toHaveValue('');
  });

  it('should not submit empty or whitespace-only messages', () => {
    const mockOnSubmit = jest.fn();
    render(<MessageInput onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/Type your message/i);
    const button = screen.getByRole('button', { name: /Send/i });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should handle form submission via Enter key', () => {
    const mockOnSubmit = jest.fn();
    render(<MessageInput onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/Type your message/i);

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.submit(input.closest('form')!);

    expect(mockOnSubmit).toHaveBeenCalledWith('Test message');
    expect(input).toHaveValue('');
  });

  it('should disable input and button when disabled prop is true', () => {
    const mockOnSubmit = jest.fn();
    render(<MessageInput onSubmit={mockOnSubmit} disabled={true} />);

    const input = screen.getByPlaceholderText(/Type your message/i);
    const button = screen.getByRole('button', { name: /Send/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('should disable button when input is empty', () => {
    const mockOnSubmit = jest.fn();
    render(<MessageInput onSubmit={mockOnSubmit} />);

    const button = screen.getByRole('button', { name: /Send/i });
    expect(button).toBeDisabled();
  });

  it('should enable button when input has text', () => {
    const mockOnSubmit = jest.fn();
    render(<MessageInput onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/Type your message/i);
    const button = screen.getByRole('button', { name: /Send/i });

    fireEvent.change(input, { target: { value: 'Test' } });
    expect(button).not.toBeDisabled();
  });
});
