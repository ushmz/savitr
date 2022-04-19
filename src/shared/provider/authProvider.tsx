import { User, UserCredential } from 'firebase/auth';
import React, { createContext } from 'react';

import { useProvideAuth } from 'shared/hooks/useAuth';

export type ContextValue = {
  signIn: (token: string) => Promise<void | UserCredential>;
  signUp: (email: string, password: string) => Promise<void | UserCredential>;
  signOut: () => Promise<void>;
  // sendPasswordResetEmail: (email: string) => Promise<void>;
  // confirmPasswordReset: (code: string, password: string) => Promise<void>;
  user: User | null;
  didAuthentication: boolean;
};

export const AuthContext = createContext({} as ContextValue);

export const useAuth = (): ContextValue => {
  return React.useContext(AuthContext);
};

type ProvideAuthProps = {
  children: React.ReactNode;
};

export const ProvideAuth: React.FC<ProvideAuthProps> = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
