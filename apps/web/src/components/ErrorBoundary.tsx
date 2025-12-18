import React, { Component, type ReactNode } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // eslint-disable-next-line no-console
    console.error('UI crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          dir="rtl"
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Box
            sx={{
              maxWidth: 520,
              width: '100%',
              bgcolor: 'background.paper',
              p: 3,
              borderRadius: 3,
              boxShadow: 3,
              border: '1px solid',
              borderColor: 'divider',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              משהו השתבש
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              נסי לרענן את העמוד. אם זה חוזר—ספרי לנו מה עשית לפני שזה קרה.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
              sx={{ borderRadius: 999 }}
            >
              רענון
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}


