import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isLocale } from "../translations/types";
// import Error from "next/error";

export const LocaleContext = createContext({ locale: "ar" });

export const LocaleProvider = ({ children, lang }) => {
  const [locale, setLocale] = useState(lang);

  const { query } = useRouter();
  useEffect(
    function updateLocaleOnQueryChange() {
      if (
        typeof query.lang === "string" &&
        isLocale(query.lang) &&
        locale !== query.lang
      ) {
        setLocale(query.lang);
      }
    },
    [query.lang]
  );

  useEffect(
    function setLocalStorageLocale() {
      if (locale !== localStorage.getItem("locale")) {
        localStorage.setItem("locale", locale);
      }
    },
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
