import GlobalStyles from "../global.css";
import { LayoutProvider } from "../contexts/layout";

function MyApp({ Component, pageProps }) {
  return (
    <LayoutProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </LayoutProvider>
  );
}

export default MyApp;
