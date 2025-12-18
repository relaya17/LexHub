import { createTheme } from '@mui/material/styles';

// LexHub palette (per spec)
// Primary: Deep Indigo #1F2A44
// Secondary: Muted Emerald #2F6F62
// Accent: Warm Sand/Gold Soft #C6A76A
// Background: #F4F3EF
// Paper: #FFFFFF
// Divider: #E0DED8
// Text: #1B1B1B / #3A3A3A / #6B6B6B
const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: { main: '#1F2A44' },
    secondary: { main: '#2F6F62' },
    warning: { main: '#C6A76A' },
    background: {
      default: '#F4F3EF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1B1B1B',
      secondary: '#6B6B6B',
    },
    divider: '#E0DED8',
  },
  typography: {
    fontFamily: '"Assistant", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    button: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          direction: 'rtl',
          textAlign: 'right',
        },
        'input, textarea': {
          direction: 'rtl',
          textAlign: 'right',
        },
        // Note: avoid left/right positioning overrides here because rtlCache flips them.
      },
    },
  },
});

export default theme;


