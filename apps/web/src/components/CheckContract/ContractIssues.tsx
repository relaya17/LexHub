import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export interface ContractIssuesProps {
  issues: string[];
}

const ContractIssues: React.FC<ContractIssuesProps> = ({ issues }) => {
  if (issues.length === 0) {
    return null;
  }

  return (
    <Card className="mb-4">
      <Card.Header className="text-center">סיכונים ובעיות משפטיות</Card.Header>
      <ListGroup variant="flush">
        {issues.map((issue) => (
          <ListGroup.Item key={issue} className="text-end">
            {issue}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default ContractIssues;


