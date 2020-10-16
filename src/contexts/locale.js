import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isLocale } from "../translations/types";
// import Error from "next/error";

export const LocaleContext = createContext({ locale: "ar" });

export const LocaleProvider = ({ children, lang }) => {
  const [locale, setLocale] = useState(lang);
  console.log("LocaleProvider - locale: ", locale);

  useEffect(
    function updateLocaleOnQueryChange() {
      console.log("updateLocaleOnQueryChange - query.locale: ", locale);
      if (typeof locale === "string" && isLocale(locale) && locale !== locale) {
        setLocale(locale);
      }
    },
    [locale]
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
