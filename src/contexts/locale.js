import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isLocale } from "../translations/types";
// import Error from "next/error";

export const LocaleContext = createContext();

export const LocaleProvider = ({ children, lang }) => {
  const { query } = useRouter();
  const [locale, setLocale] = useState(lang);
  console.log("LocaleProvider - locale: ", locale);

  useEffect(
    function updateLocaleOnQueryChange() {
      console.log("updateLocaleOnQueryChange - query.lang: ", query.lang);
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
      console.log("setLocalStorageLocale - locale: ", locale);
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
