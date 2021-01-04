import styled from "styled-components";
import useTranslation from "../../../hooks/useTranslation";
import Layout from "../../../components/Layout/Index";
import { getProduct, getProfile } from "../../../api/firebase";
import { AuthProvider } from "../../../contexts/auth";
import { LocaleProvider } from "../../../contexts/locale";
import { ContentDirectionProvider } from "../../../contexts/contentDirection";
import firebaseAdmin from "../../../firebase/admin";
import { ProfileProvider } from "../../../contexts/profile";
import Cookies from "next-cookies";
import Gallery from "../../../components/gallery/Index";
import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../../contexts/layout";
import ProductDetails from "../../../components/ProductDetails";

export async function getServerSideProps(context) {
  const {
    query: { lang, pid, color: activeColorName },
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
    var product = await getProduct(pid);
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
      activeColorName,
      serverUser,
      serverProfile,
      product,
    },
  };
}

const ProductPage = ({
  lang,
  activeColorName,
  serverUser,
  serverProfile,
  product,
}) => {
  const { colors } = product;
  const [activeColor, setActiveColor] = useState(
    colors.find((color) => color.name_en === activeColorName)
  );

  const { setSidebarExpanded } = useContext(LayoutContext);
  useEffect(() => {
    setSidebarExpanded(false);
    return () => setSidebarExpanded(true);
  }, []);

  const { t } = useTranslation(lang);

  return (
    <AuthProvider serverUser={serverUser}>
      <ProfileProvider serverProfile={serverProfile}>
        <LocaleProvider lang={lang}>
          <ContentDirectionProvider>
            <Layout fullPage>
              <Container>
                <FirstColumn>
                  <Gallery activeColor={activeColor} />
                </FirstColumn>
                <SecondColumn>
                  <ProductDetails
                    setActiveColor={setActiveColor}
                    product={product}
                    activeColor={activeColor}
                  />
                </SecondColumn>
              </Container>
            </Layout>
          </ContentDirectionProvider>
        </LocaleProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

const Container = styled.article`
  display: flex;
`;

const Column = styled.div``;

const FirstColumn = styled(Column)``;

const SecondColumn = styled(Column)`
  flex: 1 0 50%;
`;

export default ProductPage;
