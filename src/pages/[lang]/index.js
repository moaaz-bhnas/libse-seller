import { AddProductButton } from "../../components/Button/Index";
import styled from "styled-components";
import { title } from "../../components/Title/style";
import ProductsGrid from "../../components/ProductsGrid/Index";
import useTranslation from "../../hooks/useTranslation";
import strings from "../../translations/strings/productsPage";
import Layout from "../../components/Layout/Index";
import useSWR from "swr";
import { getSellerProducts } from "../../api/firebase";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { LocaleProvider } from "../../contexts/locale";
import { ContentDirectionProvider } from "../../contexts/contentDirection";

export const getStaticPaths = async () => {
  const languages = ["ar", "en"];

  const paths = languages.map((lang) => ({
    params: { lang },
  }));

  // fallback: false means pages that don’t have the
  // correct id will 404.
  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  return {
    props: {
      lang: params.lang,
    },
  };
}

const fetcher = (uid) => getSellerProducts(uid);

const IndexPage = ({ lang }) => {
  const user = useContext(AuthContext);
  const { uid } = user;
  const { data: products, error } = useSWR(uid, fetcher);

  const { t } = useTranslation(lang);

  return (
    <LocaleProvider lang={lang}>
      <ContentDirectionProvider>
        <Layout>
          <AddProductButton />

          <Title>{t(strings, "myProducts")}</Title>

          {products && <ProductsGrid products={products} seller />}
        </Layout>
      </ContentDirectionProvider>
    </LocaleProvider>
  );
};

const Title = styled.h2`
  ${title}
`;

export default IndexPage;
