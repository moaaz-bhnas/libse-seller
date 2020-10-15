import { isLocale } from "../translations/types";

export default function getLocaleInServer(context) {
  const { lang } = context.query;
  return typeof lang === "string" && isLocale(lang) ? lang : null;
}
