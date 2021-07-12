import React from 'react';
import { useAuth } from '../../shared/provider/authProvider';
import { Redirect } from 'react-router';

export const Auth: React.FC = ({ children }) => {
  const auth = useAuth();
  return auth.didAuthentication ? (
    auth.user !== null ? (
      <>{children}</>
    ) : (
      <Redirect to="/error/400" />
    )
  ) : (
    <Redirect to="/error/403" />
  );
};
