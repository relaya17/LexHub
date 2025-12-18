import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  size?: 'sm' | 'lg';
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-busy'?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  href,
  size,
  className,
  disabled = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-busy': ariaBusy,
  style,
}) => {
  return (
    <BootstrapButton
      variant={variant}
      type={type}
      onClick={onClick}
      href={href}
      size={size}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={ariaBusy}
      style={style}
    >
      {children}
    </BootstrapButton>
  );
};

export default Button;


