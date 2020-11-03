import { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children, serverProfile = null }) => {
  const [profile, setProfile] = useState(serverProfile);

  // console.log("profile: ", profile);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
