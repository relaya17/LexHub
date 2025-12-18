import React, { useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchMe, logout, logoutUser } from '../redux/slices/authSlice';
import Logo from './Logo';

type NavItem = {
  label: string;
  to: string;
  requiresAuth?: boolean;
  hideWhenAuth?: boolean;
};

const MenuSvg: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const AppNavbar: React.FC = () => {
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!auth.initialized && !auth.loading) {
      void dispatch(fetchMe());
    }
  }, [auth.initialized, auth.loading, dispatch]);

  const items: NavItem[] = useMemo(
    () => [
      { label: 'בית', to: '/' },
      { label: 'מצא עו״ד', to: '/lawyers' },
      { label: 'כתיבת מכתב', to: '/write-letter' },
      { label: 'בדיקת חוזים', to: '/contract-review' },
      { label: 'איך זה עובד', to: '/how-it-works' },
      { label: 'אודות', to: '/about' },
      { label: 'Dashboard', to: '/dashboard', requiresAuth: true },
      { label: 'התאמות', to: '/settings', requiresAuth: true },
      { label: 'Admin', to: '/admin', requiresAuth: true },
      { label: 'התחברות', to: '/login', hideWhenAuth: true },
      { label: 'הרשמה', to: '/register', hideWhenAuth: true },
    ],
    [],
  );

  const filtered = items.filter((i) => {
    if (i.requiresAuth && !auth.user) return false;
    if (i.hideWhenAuth && auth.user) return false;
    return true;
  });

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(logout());
    setOpen(false);
    navigate('/');
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {/* Mobile */}
          <IconButton
            edge="start"
            aria-label="פתח תפריט"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuSvg />
          </IconButton>

          {/* Brand */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              color: 'primary.main',
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
            aria-label="דף הבית"
          >
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              LexHub
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo height={36} showText={false} linkTo={null} />
            </Box>
          </Box>

          {/* Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
            {filtered.map((i) => (
              <Button
                key={i.to}
                component={RouterLink}
                to={i.to}
                color="inherit"
                sx={{ borderRadius: 999 }}
              >
                {i.label}
              </Button>
            ))}

            {auth.user && (
              <Button
                onClick={handleLogout}
                color="warning"
                variant="contained"
                sx={{ borderRadius: 999, ms: 1 }}
              >
                התנתקות
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 300 } }}
      >
        <Box dir="rtl" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main' }}>
            LexHub
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo height={32} showText={false} linkTo={null} />
          </Box>
        </Box>
        <Divider />
        <List dir="rtl">
          {filtered.map((i) => (
            <ListItemButton
              key={i.to}
              component={RouterLink}
              to={i.to}
              onClick={() => setOpen(false)}
            >
              <ListItemText primary={i.label} />
            </ListItemButton>
          ))}
          {auth.user && (
            <>
              <Divider />
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="התנתקות" />
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default AppNavbar;

