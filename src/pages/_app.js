import App from "next/app";
import withRedux from "next-redux-wrapper";
import { createWrapper } from "next-redux-wrapper";
import GlobalStyles from "../global.css";
import Provider, { wrapper } from "../redux/store";
import { AuthProvider } from "../contexts/auth";
import { LayoutProvider } from "../contexts/layout";
import { store } from "../redux/store";
import { SellerProvider } from "../contexts/seller";
import { LocaleProvider } from "../contexts/locale";
import { ContentDirectionProvider } from "../contexts/contentDirection";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      {/* <LocaleProvider> */}
      <AuthProvider>
        <SellerProvider>
          <LayoutProvider>
            {/* <ContentDirectionProvider> */}
            <GlobalStyles />
            <Component {...pageProps} />
            {/* </ContentDirectionProvider> */}
          </LayoutProvider>
        </SellerProvider>
      </AuthProvider>
      {/* </LocaleProvider> */}
    </Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// Here will be the requests for initial redux state
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const pageProps = await App.getInitialProps(appContext);

//   return { ...pageProps };
// };

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp);
