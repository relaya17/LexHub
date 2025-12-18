import React from 'react';
import { Form } from 'react-bootstrap';

export interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  as?: 'input' | 'textarea';
  rows?: number;
  required?: boolean;
  error?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  as = 'input',
  rows,
  required = false,
  error,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  placeholder,
}) => {
  const controlProps =
    as === 'textarea'
      ? { as: 'textarea' as const, rows: rows ?? 4 }
      : { type };

  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <Form.Group className={`mb-3 ${error ? 'has-error' : ''}`} controlId={id}>
      <Form.Label className="d-block text-end" htmlFor={id}>
        {label}
        {required && (
          <span className="text-danger ms-1" aria-label="שדה חובה">
            *
          </span>
        )}
      </Form.Label>
      <Form.Control
        id={id}
        dir="rtl"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        isInvalid={!!error}
        aria-invalid={ariaInvalid ?? !!error}
        aria-describedby={describedBy}
        placeholder={placeholder}
        {...controlProps}
      />
      {error && (
        <Form.Control.Feedback type="invalid" id={errorId} role="alert">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormInput;


