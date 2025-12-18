import React from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { PageLayout } from '../components/PageLayout';
import { useAppSelector } from '../redux/hooks';

const AdminPanel: React.FC = () => {
  const auth = useAppSelector((s) => s.auth);
  const isAdmin = auth.user?.email === 'admin@lexhub.app';

  const users = [
    { name: auth.user?.name ?? 'Admin User', email: auth.user?.email ?? 'admin@lexhub.app' },
    { name: 'Arlet Abitbol', email: 'arlet@example.com' },
  ];

  return (
    <PageLayout>
      <Box
        dir="rtl"
        sx={{
          bgcolor: 'background.paper',
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          boxShadow: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {!isAdmin ? (
          <Typography>אין הרשאה</Typography>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              פאנל ניהול
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              דוגמת רשימת משתמשים (בשלב הבא נחבר ל‑API).
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {users.map((u) => (
                <Card key={u.email} variant="outlined" sx={{ borderRadius: 3 }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <PersonIcon />
                    </Avatar>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography sx={{ fontWeight: 700 }}>{u.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {u.email}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </>
        )}
      </Box>
    </PageLayout>
  );
};

export default AdminPanel;


