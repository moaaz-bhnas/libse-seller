import { AddProductButton } from "../../components/Button/Index";
import styled from "styled-components";
import { title } from "../../components/Title/style";
import ProductsGrid from "../../components/ProductsGrid/Index";
import useTranslation from "../../hooks/useTranslation";
import strings from "../../translations/strings/productsPage";
import Layout from "../../components/Layout/Index";
import { getProfile, getSellerProducts } from "../../api/firebase";
import { AuthProvider } from "../../contexts/auth";
import { LocaleProvider } from "../../contexts/locale";
import { ContentDirectionProvider } from "../../contexts/contentDirection";
import { parseCookies } from "nookies";
import firebaseAdmin from "../../firebase/admin";
import { ProfileProvider } from "../../contexts/profile";

export async function getServerSideProps(context) {
  const {
    params: { lang },
  } = context;

  try {
    const cookies = parseCookies(context);
    var serverUser = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    var serverProfile = getProfile(serverUser.uid);
    var products = getSellerProducts(serverUser.uid);
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
      serverProfile: await serverProfile,
      products: await products,
    },
  };
}

const IndexPage = ({ lang, serverUser, serverProfile, products }) => {
  const { t } = useTranslation(lang);

  return (
    <AuthProvider serverUser={serverUser}>
      <ProfileProvider serverProfile={serverProfile}>
        <LocaleProvider lang={lang}>
          <ContentDirectionProvider>
            <Layout>
              <AddProductButton />

              <Title>{t(strings, "myProducts")}</Title>

              {products && <ProductsGrid products={products} seller />}
            </Layout>
          </ContentDirectionProvider>
        </LocaleProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

const Title = styled.h2`
  ${title}
`;

export default IndexPage;
