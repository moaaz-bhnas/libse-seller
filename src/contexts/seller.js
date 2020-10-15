import { useState, createContext, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "./auth";

export const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  // const user = useContext(AuthContext);
  // const profile = useSelector((state) => state.firebase.profile);

  // const [isSeller, setIsSeller] = useState(null);
  // useEffect(() => {
  //   setIsSeller(profile.isSeller);
  // }, [profile.isLoaded]);

  return (
    <SellerContext.Provider value={{ isSeller: true, setIsSeller: () => {} }}>
      {/* {(typeof isSeller === "boolean" || !user) && children} */}
      {children}
    </SellerContext.Provider>
  );
};
