import GlobalStyles from "../global.css";
import Provider, { wrapper } from "../redux/store";
import { AuthProvider } from "../contexts/auth";
import { LayoutProvider } from "../contexts/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <AuthProvider>
        <LayoutProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </LayoutProvider>
      </AuthProvider>
    </Provider>
  );
}

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp);
