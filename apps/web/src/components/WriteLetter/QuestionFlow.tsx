import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export interface QuestionFlowProps {
  questions: string[];
  onComplete: (answers: string[]) => void;
}

const QuestionFlow: React.FC<QuestionFlowProps> = ({ questions, onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(() =>
    questions.map(() => ''),
  );

  const handleChange = (value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = value;
      return next;
    });
  };

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="mb-4">
      <Form>
        <Form.Group controlId={`question-${step}`}>
          <Form.Label className="d-block text-end">
            {questions[step]}
          </Form.Label>
          <Form.Control
            type="text"
            dir="rtl"
            value={answers[step]}
            onChange={(event) => handleChange(event.target.value)}
          />
        </Form.Group>
        <div className="mt-3 d-flex justify-content-between">
          <Button
            variant="secondary"
            onClick={prevStep}
            disabled={step === 0}
          >
            חזרה
          </Button>
          <Button variant="primary" onClick={nextStep}>
            {step === questions.length - 1 ? 'סיום' : 'הבא'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default QuestionFlow;


