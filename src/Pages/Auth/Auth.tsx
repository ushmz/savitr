import React, { useEffect, useState } from 'react';
import { useAuth } from '../../shared/provider/authProvider';
import { Redirect } from 'react-router';
import firebase from '../../shared/utils/firebase';
import { ComponentLoaderCenter } from '../../Components/ComponentLoader';

export const Auth: React.FC = ({ children }) => {
  const auth = useAuth();
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
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
