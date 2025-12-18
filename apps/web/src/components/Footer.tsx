import React from 'react';
import { Box, Divider, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      id="site-footer"
      dir="rtl"
      role="contentinfo"
      aria-label="תחתית האתר"
      sx={{
        mt: 'auto',
        pt: 3,
        pb: 3,
        bgcolor: 'background.default',
      }}
    >
      <Divider sx={{ mb: 2 }} />

      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 1 }}>
        הבהרה משפטית: המידע באתר הינו לצורכי מידע בלבד ואינו מהווה ייעוץ משפטי מחייב.
      </Typography>

      <Typography variant="body2" textAlign="center" sx={{ mb: 1 }}>
        <MuiLink component={RouterLink} to="/about" underline="hover" color="text.secondary">
          אודות
        </MuiLink>
        {' · '}
        <MuiLink component={RouterLink} to="/privacy" underline="hover" color="text.secondary">
          מדיניות פרטיות
        </MuiLink>
        {' · '}
        <MuiLink component={RouterLink} to="/terms" underline="hover" color="text.secondary">
          תנאי שימוש
        </MuiLink>
      </Typography>

      <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
        © {currentYear} LexHub. כל הזכויות שמורות.
      </Typography>
    </Box>
  );
};

export default Footer;

