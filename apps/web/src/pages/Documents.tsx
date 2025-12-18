import React, { useState } from 'react';
import { Container, Card, Form, Button, ListGroup } from 'react-bootstrap';

interface UploadedFile {
  id: string;
  name: string;
}

const Documents: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploaded, setUploaded] = useState<UploadedFile[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!files || files.length === 0) {
      // eslint-disable-next-line no-alert
      alert('לא נבחרו קבצים להעלאה.');
      return;
    }

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
    }));

    setUploaded((prev) => [...prev, ...newFiles]);
    setFiles(null);
    (event.target as HTMLFormElement).reset();
  };

  return (
    <main className="page-background">
      <Container className="my-5" dir="rtl">
      <h2 className="mb-4 text-center">המסמכים שלי</h2>

      <Card className="p-4 mb-4">
        <Card.Title className="mb-3 text-center">העלאת מסמכים</Card.Title>
        <Form onSubmit={handleUpload}>
          <Form.Group className="mb-3">
            <Form.Label className="d-block text-end">
              בחרי קבצים להעלאה
            </Form.Label>
            <Form.Control type="file" multiple onChange={handleFileChange} />
          </Form.Group>
          <Button type="submit" variant="success">
            העלי מסמכים
          </Button>
        </Form>
      </Card>

      <Card className="p-4">
        <Card.Title className="mb-3 text-center">מסמכים שהועלו</Card.Title>
        {uploaded.length === 0 ? (
          <p className="text-muted text-end">עדיין לא הועלו מסמכים.</p>
        ) : (
          <ListGroup>
            {uploaded.map((file) => (
              <ListGroup.Item key={file.id} className="d-flex justify-content-between">
                <span>{file.name}</span>
                <Button variant="outline-primary" size="sm">
                  הורדה
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card>
      </Container>
    </main>
  );
};

export default Documents;


