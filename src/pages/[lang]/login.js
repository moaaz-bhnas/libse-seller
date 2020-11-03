import { useContext } from "react";
import { useRouter } from "next/router";
import AuthForm from "../../components/AuthForm/Index";
import { AuthContext, AuthProvider } from "../../contexts/auth";
import Layout from "../../components/Layout/Index";
import { LocaleProvider } from "../../contexts/locale";
import { ContentDirectionProvider } from "../../contexts/contentDirection";
import { useSelector } from "react-redux";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { parseCookies } from "nookies";
import firebaseAdmin from "../../firebase/admin";
import { ProfileProvider } from "../../contexts/profile";

export async function getServerSideProps(context) {
  const {
    params: { lang },
  } = context;

  try {
    const cookies = parseCookies(context);
    const serverUser = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    console.log("login page - serverUser: ", serverUser);
    return {
      redirect: {
        permanent: false,
        destination: `/${lang}`,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      lang: lang,
    },
  };
}

const LoginPage = ({ lang }) => {
  // const { user } = useContext(AuthContext);

  // const profile = useSelector((state) => state.profile.profile);
  // const isSeller = profile ? profile.isSeller : null;

  // const router = useRouter();
  // useUpdateEffect(() => {
  //   if (user) {
  //     if (isSeller) router.push(`/${lang}`);
  //     else router.push(`/${lang}/register`);
  //   }
  // }, [user, isSeller]);

  return (
    <AuthProvider>
      <ProfileProvider>
        <LocaleProvider lang={lang}>
          <ContentDirectionProvider>
            <Layout>
              <AuthForm action="login" />
            </Layout>
          </ContentDirectionProvider>
        </LocaleProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default LoginPage;
