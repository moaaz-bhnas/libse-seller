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

const SignupPage = ({ lang }) => {
  const { user } = useContext(AuthContext);
  // const { isSeller } = useContext(SellerContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(`/${lang}`);
      //   if (isSeller) router.push(`/${locale}`);
      //   else router.push(`/${locale}/register`);
    }
  }, [user]);
  // if (user) {
  // if (isSeller) router.push("/");
  // else router.push("/register");
  // }

  return (
    <LocaleProvider lang={lang}>
      <ContentDirectionProvider>
        <Layout>
          <AuthForm action="signup" />
        </Layout>
      </ContentDirectionProvider>
    </LocaleProvider>
  );
};

export default SignupPage;
