import * as React from 'react';
import { useAuth } from '../../shared/provider/authProvider';
import { ComponentLoaderCenter } from '../../Components/ComponentLoader';

export const Auth: React.FC = ({ children }) => {
  const auth = useAuth();

  return auth.user !== null ? <>{children}</> : <ComponentLoaderCenter />;
};
