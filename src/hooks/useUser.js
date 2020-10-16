import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import firebase from "../firebase/clientApp";
import {
  getUserFromCookie,
  removeUserCookie,
  setUserCookie,
} from "../utils/auth/userCookies";

const useUser = (locale) => {
  const [user, setUser] = useState("notSet");
  const router = useRouter();

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.push(`/${locale}/login`);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
      console.log("useUser - user: ", user);
      if (user) {
        setUserCookie(user);
        setUser(user);
      } else {
        removeUserCookie();
        setUser(null);
      }
    });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      router.push(`/${locale}/login`);
      return;
    }
    setUser(userFromCookie);

    return () => {
      cancelAuthListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, logout };
};

export { useUser };
