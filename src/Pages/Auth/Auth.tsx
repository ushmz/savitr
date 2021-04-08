import * as React from 'react';
import { useAuth } from '../../shared/provider/authProvider';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';
import { Redirect } from 'react-router';

export const Auth: React.FC = ({ children }) => {
  const auth = useAuth();
  return auth.didAuthentication ? (
    auth.user !== null ? (
      <>{children}</>
    ) : (
      <Redirect to="/signin" />
    )
  ) : (
    <ComponentLoaderCenter />
  );
};
