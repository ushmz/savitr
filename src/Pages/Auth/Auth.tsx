import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

import { PageLoadingCenter } from 'Components/Loader';
import { useAuth } from 'shared/provider/authProvider';
import firebase from 'shared/utils/firebase';

type AuthProps = {
  children: React.ReactNode;
};

export const Auth: React.FC<AuthProps> = ({ children }) => {
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
    return <PageLoadingCenter />;
  }
  return auth.user !== null ? <>{children}</> : <Navigate to="/error/400" />;
};
