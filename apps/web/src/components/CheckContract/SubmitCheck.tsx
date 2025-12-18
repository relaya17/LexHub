import React from 'react';
import { Box, Button } from '@mui/material';

export interface SubmitCheckProps {
  onCheck: () => void;
  disabled?: boolean;
}

const SubmitCheck: React.FC<SubmitCheckProps> = ({ onCheck, disabled }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={onCheck}
        disabled={disabled}
        sx={{
          borderRadius: 999,
          px: 4,
          py: 1.1,
          fontWeight: 800,
          minWidth: 240,
        }}
      >
        בדיקת חוזה עם AI
      </Button>
    </Box>
  );
};

export default SubmitCheck;


