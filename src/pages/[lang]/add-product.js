import { parseCookies } from "nookies";
import AddProductForm from "../../components/AddProductForm/Index";
import Layout from "../../components/Layout/Index";
import { ContentDirectionProvider } from "../../contexts/contentDirection";
import { LocaleProvider } from "../../contexts/locale";
import Protected from "../../Protected";

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

const AddProduct = ({ lang }) => {
  return (
    <LocaleProvider lang={lang}>
      <ContentDirectionProvider>
        <Protected>
          <Layout>
            <AddProductForm />
          </Layout>
        </Protected>
      </ContentDirectionProvider>
    </LocaleProvider>
  );
};

export default AddProduct;
