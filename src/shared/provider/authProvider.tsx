import React, { createContext } from 'react';
import { useProvideAuth } from 'shared/hooks/useAuth';
import { User, UserCredential } from 'firebase/auth';

export type ContextValue = {
  signIn: (uid: string, password: string) => Promise<void | UserCredential>;
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

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
