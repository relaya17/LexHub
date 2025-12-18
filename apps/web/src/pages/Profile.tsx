import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Form,
} from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  sendMessage,
  setActiveConversation,
  type ChatConversation,
} from '../redux/slices/chatSlice';

type Role = 'client' | 'lawyer';

interface UserProfileProps {
  role: Role;
  userId?: string;
  name: string;
  email: string;
  specialization?: string;
  region?: string;
}

interface LetterHistoryItem {
  id: string;
  title: string;
  status: 'draft' | 'sent' | 'approved';
  date: string;
}

const dummyLetters: LetterHistoryItem[] = [
  { id: '1', title: 'מכתב עבודה', status: 'draft', date: '2025-12-01' },
  { id: '2', title: 'מכתב חוב', status: 'sent', date: '2025-11-25' },
  { id: '3', title: 'מכתב דיור', status: 'approved', date: '2025-11-10' },
];

const Profile: React.FC<UserProfileProps> = ({
  role,
  userId,
  name,
  email,
  specialization,
  region,
}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((s) => s.chat);
  const [chatInput, setChatInput] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const resolvedUserId =
    userId ?? (role === 'lawyer' ? 'lawyer-demo' : 'client-demo');

  const conversations: ChatConversation[] = (() => {
    const list = Object.values(chatState.conversations);
    if (role === 'lawyer') {
      return list
        .filter((c) => c.lawyer.id === resolvedUserId)
        .sort((a, b) => b.updatedAt - a.updatedAt);
    }
    return list
      .filter((c) => c.client.id === resolvedUserId)
      .sort((a, b) => b.updatedAt - a.updatedAt);
  })();

  const activeConversation = chatState.activeConversationId
    ? chatState.conversations[chatState.activeConversationId]
    : null;

  const handleSelectConversation = (conversationId: string) => {
    dispatch(setActiveConversation(conversationId));
  };

  const handleSendChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    if (!chatState.activeConversationId) return;

    dispatch(
      sendMessage({
        conversationId: chatState.activeConversationId,
        senderRole: role,
        senderName: name,
        text: chatInput.trim(),
      }),
    );
    setChatInput('');
  };

  return (
    <main className="page-background">
      <Container className="my-5" dir="rtl">
        <h2 className="mb-4 text-center">
          פרופיל {role === 'client' ? 'לקוח' : 'עו״ד'}
        </h2>

        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title className="mb-3 text-end">פרטים אישיים</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-end">שם: {name}</ListGroup.Item>
                  <ListGroup.Item className="text-end">אימייל: {email}</ListGroup.Item>
                  {role === 'lawyer' && (
                    <>
                      <ListGroup.Item className="text-end">
                        התמחות: {specialization}
                      </ListGroup.Item>
                      <ListGroup.Item className="text-end">אזור: {region}</ListGroup.Item>
                    </>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title className="mb-3 text-end">שירותים ותשלומים</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-end">כתיבת מכתבים משפטיים</ListGroup.Item>
                  {role === 'client' && (
                    <>
                      <ListGroup.Item className="text-end">בדיקת חוזים עם AI</ListGroup.Item>
                      <ListGroup.Item className="text-end">מנוי חודשי: בסיסי</ListGroup.Item>
                    </>
                  )}
                  {role === 'lawyer' && (
                    <>
                      <ListGroup.Item className="text-end">
                        ניהול בקשות מכתבים מלקוחות
                      </ListGroup.Item>
                      <ListGroup.Item className="text-end">מנוי עו״ד: פרימיום</ListGroup.Item>
                    </>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={12}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="mb-3 text-end">היסטוריית מכתבים</Card.Title>
                <ListGroup>
                  {dummyLetters.map((letter) => (
                    <ListGroup.Item
                      key={letter.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span className="text-end">
                        {letter.title} – {letter.status} – {letter.date}
                      </span>
                      <Button variant="outline-success" size="sm">
                        צפייה
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="mb-3 text-end">
                  {role === 'lawyer' ? 'צ׳אט עם לקוחות (און־ליין)' : 'שיחות / הודעות'}
                </Card.Title>

                {role === 'lawyer' && conversations.length === 0 && (
                  <div className="text-end text-muted">
                    עדיין אין שיחות. לקוח שיפתח צ׳אט מפרופיל העו״ד יופיע כאן.
                  </div>
                )}

                {role === 'lawyer' && conversations.length > 0 && (
                  <Row className="g-3">
                    <Col xs={12} lg={4}>
                      <ListGroup>
                        {conversations.map((c) => (
                          <ListGroup.Item
                            key={c.id}
                            action
                            active={c.id === chatState.activeConversationId}
                            onClick={() => handleSelectConversation(c.id)}
                            className="text-end"
                          >
                            {c.client.name}
                            <div className="small text-muted">
                              {c.messages.length > 0
                                ? c.messages[c.messages.length - 1]?.text
                                : 'אין הודעות עדיין'}
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                    <Col xs={12} lg={8}>
                      <div className="chat-thread">
                        {!activeConversation || activeConversation.messages.length === 0 ? (
                          <div className="text-end text-muted">בחרי שיחה כדי לראות הודעות.</div>
                        ) : (
                          activeConversation.messages.map((m) => (
                            <div
                              key={m.id}
                              className={`chat-bubble ${
                                m.senderRole === 'lawyer' ? 'chat-bubble--me' : 'chat-bubble--them'
                              }`}
                            >
                              <div className="chat-text">{m.text}</div>
                              <div className="chat-meta">
                                {m.senderName} •{' '}
                                {new Date(m.createdAt).toLocaleTimeString('he-IL', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <Form onSubmit={handleSendChat} className="mt-3">
                        <Form.Label className="d-block text-end" htmlFor="lawyer-chat-input">
                          כתבי הודעה ללקוח
                        </Form.Label>
                        <Form.Control
                          id="lawyer-chat-input"
                          type="text"
                          placeholder="כתבי הודעה..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          disabled={!activeConversation}
                        />
                        <div className="d-flex justify-content-end">
                          <Button type="submit" className="mt-2" disabled={!activeConversation}>
                            שלח
                          </Button>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                )}

                {role === 'client' && (
                  <div className="text-end text-muted">
                    לפתיחת צ׳אט עם עו״ד, היכנסי לפרופיל עו״ד ולחצי על &quot;צ׳אט עם עו״ד&quot;.
                  </div>
                )}
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="mb-3 text-end">מסמכים</Card.Title>
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label className="d-block text-end">העלאת מסמכים</Form.Label>
                    <Form.Control type="file" multiple onChange={handleFileChange} />
                  </Form.Group>
                  <Button variant="success">העלה מסמכים</Button>
                </Form>
                {files && (
                  <ListGroup className="mt-3">
                    {Array.from(files).map((file, index) => (
                      <ListGroup.Item key={file.name + index} className="text-end">
                        {file.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Profile;

