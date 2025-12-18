import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className, ...rest }) => {
  const classes = `card mb-3 ${className ?? ''}`.trim();
  return (
    <div className={classes} {...rest}>
      {title && (
        <div className="card-header text-end">
          <strong>{title}</strong>
        </div>
      )}
      <div className="card-body text-end">{children}</div>
    </div>
  );
};

export default Card;


