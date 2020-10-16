import {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { useRouter } from "next/router";
// import { setCookie, destroyCookie } from "nookies";
import firebase from "../firebase/clientApp";
// import {
//   getUserFromCookie,
//   removeUserCookie,
//   setUserCookie,
// } from "../utils/auth/userCookies";
import { useDispatch } from "react-redux";
import { clearProfile, setProfile } from "../redux/actions/profileActions";
import useUpdateEffect from "../hooks/useUpdateEffect";

/* Redirections
- Once the the provider runs. If no user from the cookies, redirect to login. 
- If user signs in or out, redirect to /[locale] or /[locale]/login
*/

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log("AuthProvider");
  const router = useRouter();
  const { lang } = router.query;
  const dispatch = useDispatch();

  const [user, setUser] = useState("not set");

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(setUser);

    // const userFromCookie = getUserFromCookie();
    // if (!userFromCookie) {
    //   router.push(`/${lang}/login`);
    //   return;
    // }

    // setUser(userFromCookie);
    return () => {
      cancelAuthListener();
    };
  }, []);

  useUpdateEffect(() => {
    if (user) dispatch(setProfile(user.uid));
    else dispatch(clearProfile());
  }, [user]);

  console.log("(auth) user: ", user);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
