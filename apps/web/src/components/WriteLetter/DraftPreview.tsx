import React from 'react';
import { Card } from 'react-bootstrap';

export interface DraftPreviewProps {
  draft: string;
}

const DraftPreview: React.FC<DraftPreviewProps> = ({ draft }) => {
  return (
    <Card className="mb-4">
      <Card.Header className="text-center">טיוטת המכתב</Card.Header>
      <Card.Body>
        <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'right' }}>{draft}</pre>
      </Card.Body>
    </Card>
  );
};

export default DraftPreview;


