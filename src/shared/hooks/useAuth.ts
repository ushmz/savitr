import * as React from 'react';
// import { apiClient } from '../utils/apiClient';
import firebase from '../utils/firebase';
import { createUser } from '../../shared/apis/apis';

type User = firebase.User;

export const useProvideAuth = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [didAuthentication, setAuthentication] = React.useState<boolean>(false);

  const signIn = (uid: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(uid, password)
      .then(async (res) => {
        if (res.user) {
          const token = await res.user.getIdToken(true);
          localStorage.setItem('jwt', token);
        }
      });
  };

  const signUp = (externalId: string, email: string, password: string) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        if (res.user) {
          const token = await res.user.getIdToken(true);
          localStorage.setItem('jwt', token);
          await createUser(externalId);
        }
      });
  };

  const signOut = () => firebase.auth().signOut();

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
      setAuthentication(true);
    });
    // const token = localStorage.getItem('jwt');
    // if (token) {
    //   try {
    //     const exp = jwtDecode<{ exp: number }>(token).exp;
    //     const expirationTime = exp * 1000 - 60000;
    //     if (Date.now() >= expirationTime) {
    //       localStorage.clear();
    //       const newToken = user?.getIdToken(true);
    //       console.log(newToken);
    //     }
    //   } catch (err) {
    //     console.error('decode error is happened', err);
    //     localStorage.clear();
    //     const newToken = user?.getIdToken(true);
    //     console.log(newToken);
    //     const fetchToken = async () => {
    //       const newToken = await user?.getIdToken(true);
    //       console.log(newToken);
    //     };
    //     fetchToken();
    //   }
    // } else {
    //   const fetchToken = async () => {
    //     const newToken = await user?.getIdToken(true);
    //     console.log(newToken);
    //   };
    //   fetchToken();
    // }

    return () => unsubscribe();
  }, []);

  return {
    signIn,
    signUp,
    signOut,
    user,
    didAuthentication,
  };
};
