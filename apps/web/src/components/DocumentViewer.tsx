import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

export interface DocumentViewerProps {
  title?: string;
  content: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ title, content }) => {
  return (
    <BootstrapCard className="mt-3">
      {title && (
        <BootstrapCard.Header as="h5" className="text-end">
          {title}
        </BootstrapCard.Header>
      )}
      <BootstrapCard.Body>
        <pre
          dir="rtl"
          style={{
            whiteSpace: 'pre-wrap',
            textAlign: 'right',
            fontFamily: 'inherit',
          }}
        >
          {content}
        </pre>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default DocumentViewer;


