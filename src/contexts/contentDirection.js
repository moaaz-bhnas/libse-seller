import { createContext, useContext } from "react";
import { LocaleContext } from "./locale";

export const ContentDirectionContext = createContext();

export const ContentDirectionProvider = ({ children }) => {
  const { locale } = useContext(LocaleContext);

  const contentDirection = locale === "ar" ? "rtl" : "ltr";

  return (
    <ContentDirectionContext.Provider value={{ contentDirection }}>
      {children}
    </ContentDirectionContext.Provider>
  );
};
