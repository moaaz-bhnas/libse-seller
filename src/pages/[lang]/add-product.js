import AddProductForm from "../../components/AddProductForm/Index";
import Layout from "../../components/Layout/Index";
import { ContentDirectionProvider } from "../../contexts/contentDirection";
import { LocaleProvider } from "../../contexts/locale";
import Protected from "../../Protected";

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
