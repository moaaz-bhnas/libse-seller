import { useEffect, useState, createContext } from "react";
import firebase from "../firebase/clientApp";
import { useDispatch } from "react-redux";
import { clearProfile, setProfile } from "../redux/actions/profileActions";
import useUpdateEffect from "../hooks/useUpdateEffect";

export const AuthContext = createContext();

export const AuthProvider = ({ children, serverUser = null }) => {
  const dispatch = useDispatch();

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

  useUpdateEffect(() => {
    if (user) dispatch(setProfile(user.uid));
    else dispatch(clearProfile());
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
