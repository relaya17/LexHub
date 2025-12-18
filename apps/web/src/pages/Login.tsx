import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Divider, Link as MuiLink, TextField, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearAuthError, loginUser } from '../redux/slices/authSlice';
import { PageLayout } from '../components/PageLayout';
import { API_BASE_URL } from '../api/http';

type LocationState = { from?: string } | null;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    void dispatch(loginUser({ email, password }));
  };

  const oauthError = new URLSearchParams(location.search).get('oauth') === 'fail';

  return (
    <PageLayout>
      <Box
        dir="rtl"
        sx={{
          maxWidth: 480,
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
          התחברות ל‑LexHub
        </Typography>

        {oauthError && (
          <Alert severity="error" sx={{ mb: 2, textAlign: 'right' }}>
            התחברות דרך Google/Facebook נכשלה. נסי שוב.
          </Alert>
        )}

        {auth.error && (
          <Alert severity="warning" role="alert" sx={{ mb: 2, textAlign: 'right' }}>
            {auth.error}
          </Alert>
        )}

        <Box component="form" onSubmit={onSubmit} aria-label="טופס התחברות">
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
            autoComplete="current-password"
            required
            margin="normal"
          />

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
                מתחבר...
              </Box>
            ) : (
              'התחבר'
            )}
          </Button>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => {
                window.location.href = `${API_BASE_URL}/auth/oauth/google`;
              }}
              sx={{ borderRadius: 999, minWidth: 210 }}
            >
              התחבר עם Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={() => {
                window.location.href = `${API_BASE_URL}/auth/oauth/facebook`;
              }}
              sx={{ borderRadius: 999, minWidth: 210 }}
            >
              התחבר עם Facebook
            </Button>
          </Box>

          <Typography mt={2} textAlign="center" color="text.secondary">
            אין לך חשבון?{' '}
            <MuiLink component={Link} to="/register" state={{ from }} underline="hover">
              הרשמה
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Login;


