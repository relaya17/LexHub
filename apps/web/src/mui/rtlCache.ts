import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

// Emotion cache that flips styles for RTL (MUI v5/v6/v7 recommended approach).
export const rtlCache = createCache({
  key: 'mui-rtl',
  stylisPlugins: [rtlPlugin],
});


