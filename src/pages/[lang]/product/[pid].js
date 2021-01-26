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
// import Gallery from "../../../components/gallery/Index";
import ImageSlider from "../../../components/ImageSlider/Index";
import { useCallback, useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../../contexts/layout";
import ProductDetails from "../../../components/ProductDetails/Index";
import measurements from "../../../shared/measurements";
import { useRouter } from "next/router";
import sortByOrder from "../../../utils/sortByOrder";

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
  const router = useRouter();
  const { pathname, query } = router;
  const { colors } = product;
  const activeColor = colors.find((color) => color.name_en === query.color);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [fullscreenVisible, setFullscreenVisible] = useState(false);

  const { setSidebarExpanded } = useContext(LayoutContext);
  useEffect(() => {
    setSidebarExpanded(false);
    return () => setSidebarExpanded(true);
  }, []);

  const { t } = useTranslation(lang);

  const handleColorClick = useCallback((activeIndex) => {
    router.push(
      {
        pathname: pathname,
        query: {
          ...query,
          color: colors[activeIndex].name_en,
        },
      },
      undefined,
      { shallow: true }
    );
  }, []);

  return (
    <AuthProvider serverUser={serverUser}>
      <ProfileProvider serverProfile={serverProfile}>
        <LocaleProvider lang={lang}>
          <ContentDirectionProvider>
            <Layout fullPage>
              <Container>
                <FirstColumn>
                  <ImageSlider
                    fullscreen={fullscreenVisible}
                    setFullscreen={setFullscreenVisible}
                    images={sortByOrder(activeColor.images)}
                    activeIndex={activeImageIndex}
                    setActiveIndex={setActiveImageIndex}
                  />
                </FirstColumn>
                <SecondColumn>
                  <ProductDetails
                    onColorClick={handleColorClick}
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

const FirstColumn = styled(Column)`
  width: calc(
    (100vh - ${measurements.height.header}) * ${measurements.ratio.productImage}
  );
`;

const SecondColumn = styled(Column)`
  flex: 1 0 50%;
`;

export default ProductPage;
