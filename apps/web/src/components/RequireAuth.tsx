import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import type { UserRole } from '../types';
import { fetchMe } from '../redux/slices/authSlice';

interface RequireAuthProps {
  children: React.ReactElement;
  role?: UserRole;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, role }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);
  const location = useLocation();

  useEffect(() => {
    if (!auth.initialized && !auth.loading) {
      void dispatch(fetchMe());
    }
  }, [auth.initialized, auth.loading, dispatch]);

  if (!auth.initialized || auth.loading) {
    return (
      <div className="py-5 text-center text-muted" dir="rtl">
        טוען...
      </div>
    );
  }

  if (!auth.user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role && auth.user.role !== role) {
    const redirectTo = auth.user.role === 'lawyer' ? '/profile-lawyer' : '/profile';
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default RequireAuth;


