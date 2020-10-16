import { useContext } from "react";
import Form from "../../components/Register/Index";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Index";
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

const RegisterPage = ({ lang }) => {
  const { isSeller } = useContext(SellerContext);
  const router = useRouter();

  if (isSeller) {
    // router.push("/");
  }

  return (
    <LocaleProvider lang={lang}>
      <ContentDirectionProvider>
        <Layout>
          <Form />
        </Layout>
      </ContentDirectionProvider>
    </LocaleProvider>
  );
};

export default RegisterPage;
