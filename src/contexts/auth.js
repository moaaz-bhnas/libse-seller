import { useEffect, useState, createContext, useCallback } from "react";
import firebase, { firestore } from "../firebase/clientApp";

export const AuthContext = createContext();

export const AuthProvider = ({ children, serverUser = null }) => {
  const [user, setUser] = useState(serverUser);

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          setUser(user);
          const token = await user.getIdToken();
          document.cookie = `token=${token}; Path=/`;
        } else {
          setUser(null);
          document.cookie = `token=; Path=/`;
        }
      });

    return () => cancelAuthListener();
  }, []);

  // auth actions
  const logIn = useCallback(({ credentials, callback }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        callback();
        console.log("login success :D");
      })
      .catch((err) => {
        console.log("login error!", err);
      });
  }, []);

  const signUp = useCallback(({ credentials, callback }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((response) => {
        return firestore.collection("users").doc(response.user.uid).set({
          username: credentials.username,
          favorites: [],
          isSeller: false,
        });
      })
      .then(() => {
        callback();
        console.log("signup success :D");
      })
      .catch((err) => {
        console.log("signup error!", err);
      });
  }, []);

  const signOut = useCallback(({ callback }) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        callback();
        console.log("signout success :D");
      })
      .catch((err) => {
        console.log("signout error!", err);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, signOut, logIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
