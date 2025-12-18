import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

const variantClassName = (variant: ButtonProps['variant']): string => {
  switch (variant) {
    case 'secondary':
      return 'btn btn-secondary';
    case 'outline':
      return 'btn btn-outline-primary';
    case 'primary':
    default:
      return 'btn btn-primary';
  }
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...rest }) => {
  const classes = `${variantClassName(variant)} ${className ?? ''}`.trim();
  return <button className={classes} {...rest} />;
};

export default Button;


