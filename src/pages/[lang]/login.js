import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthForm from "../../components/AuthForm/Index";
import { AuthContext } from "../../contexts/auth";
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

const LoginPage = ({ lang }) => {
  console.log("login page");
  const user = useContext(AuthContext);
  // const { isSeller } = useContext(SellerContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(`/${lang}`);
      //   if (isSeller) router.push(`/${locale}`);
      //   else router.push(`/${locale}/register`);
    }
  }, [user]);

  return (
    <LocaleProvider lang={lang}>
      <ContentDirectionProvider>
        <Layout>
          <AuthForm action="login" />
        </Layout>
      </ContentDirectionProvider>
    </LocaleProvider>
  );
};

export default LoginPage;
