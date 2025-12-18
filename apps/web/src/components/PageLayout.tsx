import React from 'react';
import { Box, Container } from '@mui/material';

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 4 }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>
    </Box>
  );
};


