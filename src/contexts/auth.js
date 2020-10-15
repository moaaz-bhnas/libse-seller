import { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { setCookie, destroyCookie } from "nookies";
import firebase from "../firebase/clientApp";
import { LocaleContext } from "./locale";
// import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  console.log(router);
  const { lang } = router.query;
  const [user, setUser] = useState("not set");

  // useEffect(() => {
  //   return firebase.auth().onIdTokenChanged(async (user) => {
  //     if (!user) {
  //       setUser(null);
  //       destroyCookie({}, "token", { path: "/" });
  //       router.push(`/${lang}/login`);
  //       return;
  //     }

  //     const token = await user.getIdToken();
  //     setUser(user);
  //     setCookie({}, "token", token, { path: "/" });
  //   });
  // }, []);

  console.log("(auth) user: ", user);

  return (
    <AuthContext.Provider value={user}>
      {/* {user !== "not set" ? children : <></>} */}
      {children}
    </AuthContext.Provider>
  );
};
