import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Link as MuiLink,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearAuthError, registerUser } from '../redux/slices/authSlice';
import type { UserRole } from '../types';
import { PageLayout } from '../components/PageLayout';

type LocationState = { from?: string } | null;

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAppSelector((s) => s.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('client');

  const from =
    ((location.state as LocationState)?.from as string | undefined) ?? '/';

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth.user) {
      const target = auth.user.role === 'lawyer' ? '/profile-lawyer' : '/profile';
      navigate(target, { replace: true });
    }
  }, [auth.user, navigate]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void dispatch(registerUser({ name, email, password, role }));
  };

  return (
    <PageLayout>
      <Box
        dir="rtl"
        sx={{
          maxWidth: 520,
          mx: 'auto',
          bgcolor: 'background.paper',
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          boxShadow: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h5" mb={2} textAlign="center">
          הרשמה ל‑LexHub
        </Typography>

        {auth.error && (
          <Alert severity="warning" role="alert" sx={{ mb: 2, textAlign: 'right' }}>
            {auth.error}
          </Alert>
        )}

        <Box component="form" onSubmit={onSubmit} aria-label="טופס הרשמה">
          <TextField
            fullWidth
            label="שם"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="אימייל"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="סיסמה"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="register-role-label">אני</InputLabel>
            <Select
              labelId="register-role-label"
              value={role}
              label="אני"
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              <MenuItem value="client">לקוח/ה</MenuItem>
              <MenuItem value="lawyer">עורך/ת דין</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={auth.loading}
            sx={{ mt: 2, borderRadius: 999 }}
          >
            {auth.loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={18} color="inherit" />
                נרשם...
              </Box>
            ) : (
              'צור חשבון'
            )}
          </Button>

          <Typography mt={2} textAlign="center" color="text.secondary">
            יש לך חשבון?{' '}
            <MuiLink component={Link} to="/login" state={{ from }} underline="hover">
              התחברות
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Register;


