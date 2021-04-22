import React, { createContext } from 'react';
import { useProvideAuth } from '../hooks/useAuth';
import firebase from 'firebase/app';

// AuthState
type ContextValue = {
  signIn: (uid: string, password: string) => Promise<void | firebase.auth.UserCredential>;
  signUp: (email: string, password: string) => Promise<void | firebase.auth.UserCredential>;
  signOut: () => Promise<void>;
  // sendPasswordResetEmail: (email: string) => Promise<void>;
  // confirmPasswordReset: (code: string, password: string) => Promise<void>;
  user: firebase.User | null;
  didAuthentication: boolean;
  isTaskReady: boolean;
};

export const AuthContext = createContext({} as ContextValue);

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
