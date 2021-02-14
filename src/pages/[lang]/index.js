import { AddProductButton } from "../../components/Button/Index";
import ProductsGrid from "../../components/ProductsGrid/Index";
import Layout from "../../components/Layout/Index";
import { getProfile, getSellerProducts } from "../../api/firebase";
import { AuthProvider } from "../../contexts/auth";
import { LocaleProvider } from "../../contexts/locale";
import { ContentDirectionProvider } from "../../contexts/contentDirection";
import firebaseAdmin from "../../firebase/admin";
import { ProfileProvider } from "../../contexts/profile";
import Cookies from "next-cookies";

export async function getServerSideProps(context) {
  const {
    params: { lang },
  } = context;

  try {
    const cookies = Cookies(context);
    console.log("index - cookies: ", cookies);
    var serverUser = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    var serverProfile = await getProfile(serverUser.uid);
    if (!serverProfile.isSeller) {
      return {
        redirect: {
          permanent: false,
          destination: `/${lang}/register`,
        },
      };
    }
    var products = await getSellerProducts(serverUser.uid);
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        permanent: false,
        destination: `/${lang}/login`,
      },
    };
  }

  return {
    props: {
      lang,
      serverUser,
      serverProfile,
      products,
    },
  };
}

const IndexPage = ({ lang, serverUser, serverProfile, products }) => {
  console.log("lang: ", lang);

  return (
    <AuthProvider serverUser={serverUser}>
      <ProfileProvider serverProfile={serverProfile}>
        <LocaleProvider lang={lang}>
          <ContentDirectionProvider>
            <Layout>
              <AddProductButton />

              {products && <ProductsGrid products={products} seller />}
            </Layout>
          </ContentDirectionProvider>
        </LocaleProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default IndexPage;
