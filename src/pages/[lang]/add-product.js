import Cookies from "next-cookies";
import AddProductForm from "../../components/AddProductForm/Index";
import Layout from "../../components/Layout/Index";
import { AuthProvider } from "../../contexts/auth";
import { ContentDirectionProvider } from "../../contexts/contentDirection";
import { LocaleProvider } from "../../contexts/locale";
import firebaseAdmin from "../../firebase/admin";
import { ProfileProvider } from "../../contexts/profile";
import { getProfile } from "../../api/firebase";
import { connectToDatabase } from "../../db";

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const {
    params: { lang },
  } = context;

  try {
    const cookies = Cookies(context);
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

const AddProduct = ({ lang, serverUser, serverProfile }) => {
  return (
    <AuthProvider serverUser={serverUser}>
      <ProfileProvider serverProfile={serverProfile}>
        <LocaleProvider lang={lang}>
          <ContentDirectionProvider>
            <Layout>
              <AddProductForm />
            </Layout>
          </ContentDirectionProvider>
        </LocaleProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default AddProduct;
