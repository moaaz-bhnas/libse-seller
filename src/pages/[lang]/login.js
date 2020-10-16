import { useContext } from "react";
import { useRouter } from "next/router";
import AuthForm from "../../components/AuthForm/Index";
import { AuthContext } from "../../contexts/auth";
import Layout from "../../components/Layout/Index";
import { LocaleProvider } from "../../contexts/locale";
import { ContentDirectionProvider } from "../../contexts/contentDirection";
import { useSelector } from "react-redux";
import useUpdateEffect from "../../hooks/useUpdateEffect";

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
  const { user } = useContext(AuthContext);

  const profile = useSelector((state) => state.profile.profile);
  const isSeller = profile ? profile.isSeller : null;

  const router = useRouter();
  useUpdateEffect(() => {
    if (user) {
      if (isSeller) router.push(`/${lang}`);
      else router.push(`/${lang}/register`);
    }
  }, [user, isSeller]);

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
