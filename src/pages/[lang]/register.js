import Form from "../../components/Register/Index";
import Layout from "../../components/Layout/Index";
import { LocaleProvider } from "../../contexts/locale";
import { ContentDirectionProvider } from "../../contexts/contentDirection";
import { AuthProvider } from "../../contexts/auth";
import { ProfileProvider } from "../../contexts/profile";
import { parseCookies } from "nookies";
import firebaseAdmin from "../../firebase/admin";
import { getProfile } from "../../api/firebase";

export async function getServerSideProps(context) {
  const {
    params: { lang },
  } = context;

  try {
    const cookies = parseCookies(context);
    var serverUser = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    var serverProfile = await getProfile(serverUser.uid);
    if (serverProfile.isSeller) {
      return {
        redirect: {
          permanent: false,
          destination: `/${lang}`,
        },
      };
    }
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
      serverUser,
      serverProfile,
    },
  };
}

const RegisterPage = ({ lang, serverUser, serverProfile }) => {
  return (
    <AuthProvider serverUser={serverUser}>
      <ProfileProvider serverProfile={serverProfile}>
        <LocaleProvider lang={lang}>
          <ContentDirectionProvider>
            <Layout>
              <Form />
            </Layout>
          </ContentDirectionProvider>
        </LocaleProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default RegisterPage;
