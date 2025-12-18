import React from 'react';
import { Card } from 'react-bootstrap';

export interface ContractSummaryProps {
  summary: string;
}

const ContractSummary: React.FC<ContractSummaryProps> = ({ summary }) => {
  return (
    <Card className="mb-4">
      <Card.Header className="text-center">סיכום החוזה</Card.Header>
      <Card.Body>
        <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'right' }}>{summary}</pre>
      </Card.Body>
    </Card>
  );
};

export default ContractSummary;


