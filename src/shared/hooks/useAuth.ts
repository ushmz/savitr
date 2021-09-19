import * as React from 'react';
import { ContextValue } from 'shared/provider/authProvider';
import firebase from 'shared/utils/firebase';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { User } from 'firebase/auth';

export const useProvideAuth = (): ContextValue => {
  const [user, setUser] = React.useState<User | null>(null);
  const [didAuthentication, setAuthentication] = React.useState<boolean>(false);
  const auth = getAuth(firebase);

  const signIn = async (uid: string, password: string) => {
    //.setPersistence(Persistence.LOCAL)
    return signInWithEmailAndPassword(auth, uid, password).then(async (res) => {
      if (res.user) {
        const token = await res.user.getIdToken(true);
        localStorage.setItem('jwt', token);
      }
    });
  };

  const signUp = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
      if (res.user) {
        const token = await res.user.getIdToken(true);
        localStorage.setItem('jwt', token);
      }
    });
  };

  const signOut = () => auth.signOut();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
