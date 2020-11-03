import AuthForm from "../../components/AuthForm/Index";
import { AuthProvider } from "../../contexts/auth";
import Layout from "../../components/Layout/Index";
import { LocaleProvider } from "../../contexts/locale";
import { ContentDirectionProvider } from "../../contexts/contentDirection";
import { parseCookies } from "nookies";
import firebaseAdmin from "../../firebase/admin";
import { ProfileProvider } from "../../contexts/profile";
import { getProfile } from "../../api/firebase";

export async function getServerSideProps(context) {
  const {
    params: { lang },
  } = context;

  try {
    const cookies = parseCookies(context);
    console.log("login page - cookies: ", cookies);
    const serverUser = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const serverProfile = await getProfile(serverUser.uid);
    const destination = serverProfile.isSeller
      ? `/${lang}`
      : `/${lang}/register`;
    return {
      redirect: {
        permanent: false,
        destination,
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
