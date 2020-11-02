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
import Protected from "../../Protected";
import { parseCookies } from "nookies";

export async function getServerSideProps(context) {
  const {
    params: { lang },
  } = context;

  const cookies = parseCookies(context);
  console.log(cookies);
  if (!cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: `${lang}/login`,
      },
    };
  }

  return {
    props: {
      lang: lang,
    },
  };
}

const fetcher = (uid) => getSellerProducts(uid);

const IndexPage = ({ lang }) => {
  const { user } = useContext(AuthContext);
  const { data: products, error } = useSWR(user ? user.uid : null, fetcher);

  const { t } = useTranslation(lang);

  return (
    <LocaleProvider lang={lang}>
      <ContentDirectionProvider>
        <Protected>
          <Layout>
            <AddProductButton />

            <Title>{t(strings, "myProducts")}</Title>

            {products && <ProductsGrid products={products} seller />}
          </Layout>
        </Protected>
      </ContentDirectionProvider>
    </LocaleProvider>
  );
};

const Title = styled.h2`
  ${title}
`;

export default IndexPage;
