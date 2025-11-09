import React from 'react';

interface ServiceInputProps {
  service: string;
  onChange: (service: string) => void;
  disabled?: boolean;
}

/**
 * Component for service selection input
 */
export const ServiceInput: React.FC<ServiceInputProps> = ({
  service,
  onChange,
  disabled = false,
}) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label
        htmlFor="service-input"
        style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}
      >
        Service:
      </label>
      <input
        id="service-input"
        type="text"
        value={service}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="e.g., dhti_elixir_template"
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '3px',
        }}
      />
    </div>
  );
};
