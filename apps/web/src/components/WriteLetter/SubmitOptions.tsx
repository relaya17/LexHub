import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export interface SubmitOptionsProps {
  onSendAI: () => void;
  onSendLawyer: () => void;
}

const SubmitOptions: React.FC<SubmitOptionsProps> = ({ onSendAI, onSendLawyer }) => {
  return (
    <div className="mb-4 text-center">
      <h5 className="mb-3">שליחת המכתב באמצעות:</h5>
      <ButtonGroup>
        <Button variant="success" onClick={onSendAI}>
          AI
        </Button>
        <Button variant="warning" onClick={onSendLawyer}>
          עו״ד
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SubmitOptions;


