import GlobalStyles from "../global.css";
import { AuthProvider } from "../contexts/auth";
import { LayoutProvider } from "../contexts/layout";

function MyApp({ Component, pageProps }) {
  return (
    // {/* <AuthProvider> */}
    <LayoutProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </LayoutProvider>
    //   {/* </AuthProvider> */}
  );
}

export default MyApp;
