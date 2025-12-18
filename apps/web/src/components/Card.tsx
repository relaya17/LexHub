import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

export interface CardProps {
  title?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <BootstrapCard className="mb-3">
      {title && (
        <BootstrapCard.Header as="h5" className="text-end">
          {title}
        </BootstrapCard.Header>
      )}
      <BootstrapCard.Body className="text-end">{children}</BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;


