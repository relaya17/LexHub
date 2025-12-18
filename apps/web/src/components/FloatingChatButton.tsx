import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const FloatingChatButton: React.FC = () => {
  const auth = useAppSelector((s) => s.auth);

  if (!auth.user) return null;

  const asParam = auth.user.role === 'lawyer' ? 'lawyer' : 'client';

  return (
    <Link
      to={`/chat?as=${asParam}`}
      className="lexhub-fab-chat"
      aria-label="פתח צ׳אט"
    >
      צ׳אט
    </Link>
  );
};

export default FloatingChatButton;


