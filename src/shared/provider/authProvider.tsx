import React, { createContext } from 'react';
import { useProvideAuth } from '../hooks/useAuth';
import { ContextValue } from '../types';

export const AuthContext = createContext({} as ContextValue);

export const useAuth = (): ContextValue => {
  return React.useContext(AuthContext);
};

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
