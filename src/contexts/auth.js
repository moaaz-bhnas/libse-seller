import { useEffect, useState, createContext } from "react";
import firebase from "../firebase/clientApp";
import { useDispatch } from "react-redux";
import { clearProfile, setProfile } from "../redux/actions/profileActions";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { setCookie, destroyCookie } from "nookies";

/* Redirections
- Once the the provider runs. If no user from the cookies, redirect to login. 
- If user signs in or out, redirect to /[locale] or /[locale]/login
*/

export const AuthContext = createContext();

export const AuthProvider = ({ children, serverUser = null }) => {
  console.log("serverUser:", serverUser);

  console.log("AuthProvider");
  const dispatch = useDispatch();

  const [user, setUser] = useState(serverUser);

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          setUser(user);
          const token = await user.getIdToken();
          setCookie(null, "token", token);
        } else {
          setUser(null);
          destroyCookie(null, "token");
        }
      });

    return () => cancelAuthListener();
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
