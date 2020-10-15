export default function formatPrice(lang, price) {
  const locale = lang === "en" ? "en-US" : "ar-EG";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EGP",
  }).format(price);
}
