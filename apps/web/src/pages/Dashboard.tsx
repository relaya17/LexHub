import React from 'react';
import { Badge, Box, Button, Card, CardContent, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import { PageLayout } from '../components/PageLayout';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout, logoutUser } from '../redux/slices/authSlice';

const Dashboard: React.FC = () => {
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const stats = [
    {
      label: 'הושלמו',
      value: 12,
      icon: <CheckCircleIcon color="success" />,
      badgeColor: 'success' as const,
    },
    {
      label: 'בקשות בהמתנה',
      value: 5,
      icon: <PendingIcon color="warning" />,
      badgeColor: 'warning' as const,
    },
    {
      label: 'שגיאות',
      value: 1,
      icon: <ErrorIcon color="error" />,
      badgeColor: 'error' as const,
    },
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
        <Typography variant="h4" mb={1}>
          שלום{auth.user?.name ? `, ${auth.user.name}` : ''}!
        </Typography>
        <Typography color="text.secondary" mb={3}>
          {auth.user?.email ? `אימייל: ${auth.user.email}` : ''}
        </Typography>

        <Typography variant="h6" mb={2}>
          סטטוס
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          {stats.map((stat) => (
            <Card key={stat.label} sx={{ minWidth: 220, flex: '1 1 220px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                  <Typography variant="h6">{stat.label}</Typography>
                  {stat.icon}
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Badge badgeContent={stat.value} color={stat.badgeColor}>
                    <Box sx={{ width: 8, height: 8 }} />
                  </Badge>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Button
          variant="contained"
          color="warning"
          onClick={() => {
            void dispatch(logoutUser()).finally(() => dispatch(logout()));
          }}
          sx={{ borderRadius: 999 }}
        >
          התנתקות
        </Button>
      </Box>
    </PageLayout>
  );
};

export default Dashboard;


