import { createContext, useState } from "react";

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <LayoutContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>
      {children}
    </LayoutContext.Provider>
  );
};
