import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { ComponentLoaderCenter } from 'Components/ComponentLoader';
import { useAuth } from 'shared/provider/authProvider';
import firebase from 'shared/utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const Auth: React.FC = ({ children }) => {
  const auth = useAuth();
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    const fbAuth = getAuth(firebase);
    onAuthStateChanged(fbAuth, (user) => {
      if (user) {
        auth.user = user;
      }
      setAuthChecked(true);
    });
  });

  if (!authChecked) {
    return <ComponentLoaderCenter />;
  }
  return auth.user !== null ? <>{children}</> : <Redirect to="/error/400" />;
};
