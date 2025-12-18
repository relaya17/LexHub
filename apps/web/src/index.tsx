import React from 'react';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/accessibility.css';
import './styles/material-theme.css';
import theme from './theme';
import { rtlCache } from './mui/rtlCache';
import { ErrorBoundary } from './components/ErrorBoundary';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <CacheProvider value={rtlCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ThemeProvider>
      </CacheProvider>
    </React.StrictMode>,
  );
}

