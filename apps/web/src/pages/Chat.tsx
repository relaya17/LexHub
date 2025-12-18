import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Form, Button, ListGroup, Row, Col, Card } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  buildConversationId,
  ensureConversation,
  sendMessage,
  setActiveConversation,
  type ChatConversation,
  type ChatUserRole,
} from '../redux/slices/chatSlice';

const Chat: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const chat = useAppSelector((s) => s.chat);

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const asParam = params.get('as');
  const viewRole: ChatUserRole = asParam === 'lawyer' ? 'lawyer' : 'client';
  const conversationIdParam = params.get('conversationId');
  const lawyerIdParam = params.get('lawyerId');
  const lawyerNameParam = params.get('lawyerName');

  const currentUser = useMemo(() => {
    if (viewRole === 'lawyer') {
      return { id: 'lawyer-demo', name: 'עו״ד דמו', role: 'lawyer' as const };
    }
    return { id: 'client-demo', name: 'ישראל ישראלי', role: 'client' as const };
  }, [viewRole]);

  const [input, setInput] = useState<string>('');

  const conversations: ChatConversation[] = useMemo(() => {
    const list = Object.values(chat.conversations);
    if (viewRole === 'lawyer') {
      return list
        .filter((c) => c.lawyer.id === currentUser.id)
        .sort((a, b) => b.updatedAt - a.updatedAt);
    }
    // client
    return list
      .filter((c) => c.client.id === currentUser.id)
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [chat.conversations, currentUser.id, viewRole]);

  const activeConversation = chat.activeConversationId
    ? chat.conversations[chat.activeConversationId]
    : null;

  // Ensure conversation from URL exists and becomes active
  useEffect(() => {
    if (conversationIdParam) {
      dispatch(setActiveConversation(conversationIdParam));
      return;
    }

    if (viewRole === 'client' && lawyerIdParam) {
      const convId = buildConversationId(currentUser.id, lawyerIdParam);
      dispatch(
        ensureConversation({
          conversationId: convId,
          lawyer: { id: lawyerIdParam, name: lawyerNameParam ?? 'עו״ד' },
          client: { id: currentUser.id, name: currentUser.name },
        }),
      );
      dispatch(setActiveConversation(convId));
      return;
    }

    if (!chat.activeConversationId && conversations.length > 0) {
      dispatch(setActiveConversation(conversations[0].id));
    }
  }, [
    chat.activeConversationId,
    conversationIdParam,
    conversations,
    currentUser.id,
    currentUser.name,
    dispatch,
    lawyerIdParam,
    lawyerNameParam,
    viewRole,
  ]);

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) {
      return;
    }
    if (!chat.activeConversationId) return;
    dispatch(
      sendMessage({
        conversationId: chat.activeConversationId,
        senderRole: currentUser.role,
        senderName: currentUser.name,
        text: input.trim(),
      }),
    );
    setInput('');
  };

  return (
    <main className="page-background">
      <Container className="my-5" dir="rtl">
        <h2 className="mb-4 text-center">
          {viewRole === 'lawyer' ? 'מרכז צ׳אט לעו״ד' : 'צ׳אט עם עו״ד'}
        </h2>

        <Row className="g-3">
          {viewRole === 'lawyer' && (
            <Col xs={12} lg={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="text-end">שיחות נכנסות</Card.Title>
                  <ListGroup role="list">
                    {conversations.length === 0 ? (
                      <ListGroup.Item className="text-end text-muted">
                        עדיין אין שיחות. כאשר לקוח יפתח צ׳אט—זה יופיע כאן.
                      </ListGroup.Item>
                    ) : (
                      conversations.map((c) => (
                        <ListGroup.Item
                          key={c.id}
                          action
                          active={c.id === chat.activeConversationId}
                          onClick={() => dispatch(setActiveConversation(c.id))}
                          className="text-end"
                          role="listitem"
                        >
                          {c.client.name}
                          <div className="small text-muted">
                            {c.messages.length > 0
                              ? c.messages[c.messages.length - 1]?.text
                              : 'אין הודעות עדיין'}
                          </div>
                        </ListGroup.Item>
                      ))
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          )}

          <Col xs={12} lg={viewRole === 'lawyer' ? 8 : 12}>
            <Card>
              <Card.Body>
                <Card.Title className="text-end">
                  {activeConversation
                    ? viewRole === 'lawyer'
                      ? `שיחה עם ${activeConversation.client.name}`
                      : `שיחה עם ${activeConversation.lawyer.name}`
                    : 'בחרי שיחה'}
                </Card.Title>

                <div className="chat-thread" role="log" aria-live="polite" aria-relevant="additions">
                  {!activeConversation || activeConversation.messages.length === 0 ? (
                    <div className="text-end text-muted">
                      עדיין אין הודעות. כתבי הודעה ראשונה כדי להתחיל צ׳אט.
                    </div>
                  ) : (
                    activeConversation.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`chat-bubble ${
                          m.senderRole === currentUser.role ? 'chat-bubble--me' : 'chat-bubble--them'
                        }`}
                      >
                        <div className="chat-text">{m.text}</div>
                        <div className="chat-meta">
                          {m.senderName} • {new Date(m.createdAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <Form onSubmit={handleSend} className="mt-3">
                  <Form.Label className="d-block text-end" htmlFor="chat-input">
                    כתבי הודעה
                  </Form.Label>
                  <Form.Control
                    id="chat-input"
                    type="text"
                    placeholder="כתבי הודעה..."
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    disabled={!activeConversation}
                  />
                  <div className="d-flex justify-content-end">
                    <Button type="submit" className="mt-2" disabled={!activeConversation}>
                      שלח
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Chat;


