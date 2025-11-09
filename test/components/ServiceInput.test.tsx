import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ServiceInput } from '../../src/components/ServiceInput';

describe('ServiceInput', () => {
  it('should render label and input field', () => {
    const mockOnChange = jest.fn();
    render(<ServiceInput service="test_service" onChange={mockOnChange} />);

    expect(screen.getByLabelText(/Service:/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/dhti_elixir_template/i)
    ).toBeInTheDocument();
  });

  it('should display the current service value', () => {
    const mockOnChange = jest.fn();
    render(<ServiceInput service="my_service" onChange={mockOnChange} />);

    const input = screen.getByLabelText(/Service:/i);
    expect(input).toHaveValue('my_service');
  });

  it('should call onChange when input value changes', () => {
    const mockOnChange = jest.fn();
    render(<ServiceInput service="initial_service" onChange={mockOnChange} />);

    const input = screen.getByLabelText(/Service:/i);
    fireEvent.change(input, { target: { value: 'new_service' } });

    expect(mockOnChange).toHaveBeenCalledWith('new_service');
  });

  it('should be disabled when disabled prop is true', () => {
    const mockOnChange = jest.fn();
    render(
      <ServiceInput
        service="test_service"
        onChange={mockOnChange}
        disabled={true}
      />
    );

    const input = screen.getByLabelText(/Service:/i);
    expect(input).toBeDisabled();
  });

  it('should not be disabled by default', () => {
    const mockOnChange = jest.fn();
    render(<ServiceInput service="test_service" onChange={mockOnChange} />);

    const input = screen.getByLabelText(/Service:/i);
    expect(input).not.toBeDisabled();
  });

  it('should handle empty service value', () => {
    const mockOnChange = jest.fn();
    render(<ServiceInput service="" onChange={mockOnChange} />);

    const input = screen.getByLabelText(/Service:/i);
    expect(input).toHaveValue('');
  });

  it('should update when service prop changes', () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(
      <ServiceInput service="service_1" onChange={mockOnChange} />
    );

    let input = screen.getByLabelText(/Service:/i);
    expect(input).toHaveValue('service_1');

    rerender(<ServiceInput service="service_2" onChange={mockOnChange} />);

    input = screen.getByLabelText(/Service:/i);
    expect(input).toHaveValue('service_2');
  });
});
