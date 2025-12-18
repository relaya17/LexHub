import React from 'react';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { PageLayout } from '../components/PageLayout';

const Settings: React.FC = () => {
  return (
    <PageLayout>
      <Card dir="rtl" sx={{ p: 0, borderRadius: 3, boxShadow: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="h6" gutterBottom>
            התאמות חשבון
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            אפשרויות נפוצות (בשלב הבא נחבר למסכים/‑API).
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Chip label="שינוי סיסמה" color="primary" />
            <Chip label="התראות" color="secondary" />
            <Chip label="פרטיות" color="warning" />
          </Box>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Settings;


