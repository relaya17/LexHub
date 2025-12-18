import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, ...rest }) => {
  const inputId = id ?? (label ? `input-${label}` : undefined);

  return (
    <div className="mb-3 text-end">
      {label && (
        <label className="form-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input id={inputId} className="form-control" {...rest} />
    </div>
  );
};

export default Input;


