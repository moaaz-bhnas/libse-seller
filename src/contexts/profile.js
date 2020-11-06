import { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children, serverProfile = null }) => {
  const [profile, setProfile] = useState(serverProfile);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
