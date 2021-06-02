import { memo, useState, useCallback, useContext, useReducer } from "react";
import Category from "./components/Category";
import Details from "./components/Details";
import ProgressBar from "./components/ProgressBar";
import ColorsAndSizes from "./components/ColorsAndSizes";
import Price from "./components/Price";
import { AuthContext } from "../../contexts/auth";
import { addProduct } from "../../api/firebase";
import { useRouter } from "next/router";
import styled from "styled-components";
import { title } from "../Title/style";
import CategorySvg from "../../svgs/Category";
import DetailsSvg from "../../svgs/Details";
import ColorsSvg from "../../svgs/Colors";
import PriceSvg from "../../svgs/Price";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { categories } from "../../shared/data";
import { LocaleContext } from "../../contexts/locale";
import useTranslation from "../../hooks/useTranslation";
import strings from "../../translations/strings/addProductPage";
import { ContentDirectionContext } from "../../contexts/contentDirection";
import cloneArrayOfObjects from "../../utils/cloneArrayOfObjects";
import calculateProportionsTotal from "../../utils/calculateMaterialsProportionsTotal";
import BounceLoader from "react-spinners/BounceLoader";
import theme from "../../shared/theme";

const AddProductForm = ({ setLoading }) => {
  const { locale } = useContext(LocaleContext);
  const { contentDirection } = useContext(ContentDirectionContext);

  // translations
  const { t } = useTranslation();

  const { user } = useContext(AuthContext);
  const sellerId = user && user.uid;
  const router = useRouter();

  // Inputs
  const [productName, setProductName] = useState("Product Name");

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  useUpdateEffect(() => {
    setSelectedSubCategoryIndex(0);
  }, [selectedCategoryIndex]);

  const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(0);
  const subCategories = categories[selectedCategoryIndex].subCategories;
  const selectedCategory = categories[selectedCategoryIndex];
  const selectedSubCategory =
    selectedCategory.subCategories[selectedSubCategoryIndex];
  useUpdateEffect(() => {
    setSelectedGroupIndex(0);
  }, [selectedSubCategoryIndex]); // re-render

  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const { groups } = selectedSubCategory;
  const selectedGroup = groups[selectedGroupIndex];
  const { details } = selectedGroup;
  const { materials } = selectedGroup;
  useUpdateEffect(
    function clearSelectedDetails() {
      console.log("test");
      setSelectedDetails(initialDetailsState());
      setSelectedMaterials(initialMaterialsState());
    },
    [selectedCategoryIndex, selectedSubCategoryIndex, selectedGroupIndex]
  ); // re-render

  const initialDetailsState = () => {
    return details.map((detail) => ({
      ...detail,
      value_ar: "",
      value_en: "",
    }));
  };
  const [selectedDetails, setSelectedDetails] = useState(initialDetailsState());

  const initialMaterialsState = () => {
    return materials ? cloneArrayOfObjects(materials) : null;
  };
  const [selectedMaterials, setSelectedMaterials] = useState(
    initialMaterialsState()
  );

  useUpdateEffect(
    function updateDetailsStepFinishState() {
      const detailsFinished = selectedDetails
        .filter((detail) => detail.required)
        .every((detail) => detail.value_ar && detail.value_en);
      const materialsFinished = selectedMaterials
        ? calculateProportionsTotal(selectedMaterials) === 100
        : true;
      const stepFinished = detailsFinished && materialsFinished;

      stepsDispatch({
        type: "updateFinishState",
        payload: { stepId: 2, finished: stepFinished },
      });
    },
    [selectedDetails, selectedMaterials]
  );

  const [description, setDescription] = useState("Description"); // Not sure about removing this option yet

  const [colors, setColors] = useState([
    { name_ar: "", name_en: "", sizes: [], images: [], default: false },
  ]);
  useUpdateEffect(
    function updateColorsStepFinishState() {
      const stepFinished = colors.every(
        (color) =>
          color[`name_${locale}`] &&
          color.sizes.length &&
          color.images.length > 2
      );
      stepsDispatch({
        type: "updateFinishState",
        payload: { stepId: 3, finished: stepFinished },
      });
    },
    [colors]
  );

  const [price, setPrice] = useState("");
  useUpdateEffect(
    function updatePriceStepFinishState() {
      const stepFinished = !!price;
      stepsDispatch({
        type: "updateFinishState",
        payload: { stepId: 4, finished: stepFinished },
      });
    },
    [price]
  );

  const [salePrice, setSalePrice] = useState("");

  // Steps
  const initSteps = [
    {
      id: 1,
      translationKey: "category",
      Icon: CategorySvg,
      finished: true,
    },
    {
      id: 2,
      translationKey: "details",
      Icon: DetailsSvg,
      finished: Object.keys(selectedDetails).length !== 0, // to be improved
      finished: false,
    },
    {
      id: 3,
      translationKey: "colorsSizes",
      Icon: ColorsSvg,
      finished: false,
    },
    {
      id: 4,
      translationKey: "price",
      Icon: PriceSvg,
      finished: false,
    },
  ];
  const stepsReducer = (steps, action) => {
    const { stepId: id, finished, inProgress } = action.payload;
    switch (action.type) {
      case "updateFinishState":
        return steps.map((step) => {
          if (step.id === id) {
            step.finished = finished;
          }
          return step;
        });
      case "update":
        return steps.map((step) => {
          if (step.id === id) {
            step.finished = finished;
            step.inProgress = inProgress;
          }
          return step;
        });
      default:
        throw new Error("Unknown action type");
    }
  };
  const [steps, stepsDispatch] = useReducer(stepsReducer, initSteps);

  const [activeStep, setActiveStep] = useState(1);

  const handleStepSubmit = useCallback(
    (event, disabled = false) => {
      if (!disabled) {
        event.preventDefault();
        setActiveStep(activeStep + 1);
      }
    },
    [activeStep]
  );

  const goToPreviousStep = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep]);

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const allStepsFinished = steps.every((step) => step.finished);
      if (!allStepsFinished) return;
      // Naming logic goes here ..

      // Set loading to true
      setLoading(true);

      const newProduct = modelProduct();
      createProduct(newProduct);

      const category = categories[selectedCategoryIndex];
      const product = {
        name: productName,
        category_ar: category.name_ar,
        category_en: category.name_en,
        sub_category_ar:
          category.subCategories[selectedSubCategoryIndex].name_ar,
        sub_category_en:
          category.subCategories[selectedSubCategoryIndex].name_en,
        group_ar: selectedGroup.name_ar,
        group_en: selectedGroup.name_en,
        details: selectedDetails.filter(
          (detail) => detail.value_en !== "Other"
        ),
        materials:
          selectedMaterials &&
          selectedMaterials.filter((material) => material.proportion),
        description,
        colors,
        price,
      };
      console.log("product: ", product);
      addProduct({
        seller_id: sellerId,
        product,
        callback: () => router.push(`/${locale}/`),
      });
    },
    [
      selectedCategoryIndex,
      selectedSubCategoryIndex,
      selectedGroupIndex,
      selectedDetails,
      selectedMaterials,
      colors,
      price,
    ]
  );

  const modelProduct = useCallback(() => {
    const category = categories[selectedCategoryIndex];
    const subCategory = category.subCategories[selectedSubCategoryIndex];
    const details = selectedDetails
      .map((detail) => ({
        name: {
          en: detail.name_en,
          ar: detail.name_ar,
        },
        value: {
          en: detail.value_en,
          ar: detail.value_ar,
        },
      }))
      .filter((detail) => detail.value.en !== "Other");

    const materials =
      selectedMaterials &&
      selectedMaterials
        .map(({ name_en, name_ar, proportion }) => ({
          name: {
            en: name_en,
            ar: name_ar,
          },
          proportion,
        }))
        .filter((material) => material.proportion);

    const formattedColors = colors.map(
      ({ name_ar, name_en, sizes, images, ...color }) => ({
        default: color.default,
        name: {
          en: name_en,
          ar: name_ar,
        },
        sizes: sizes.map((size) => size.name),
        images,
      })
    );

    const product = {
      sellerId,
      name: productName,
      category: {
        en: category.name_en,
        ar: category.name_ar,
      },
      clothing: {
        en: subCategory.name_en,
        ar: subCategory.name_ar,
      },
      group: {
        en: selectedGroup.name_en,
        ar: selectedGroup.name_ar,
      },
      details,
      materials,
      colors: formattedColors,
      price,
    };

    return product;
  }, [
    selectedCategoryIndex,
    selectedSubCategoryIndex,
    selectedGroupIndex,
    selectedDetails,
    selectedMaterials,
    colors,
    price,
  ]);

  const createProduct = useCallback(async (product) => {
    console.log("mongo product: ", product);

    try {
      const res = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      router.push(`/${locale}/`);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Form contentDirection={contentDirection} onSubmit={handleFormSubmit}>
      <Title>{t(strings, "addProduct")}</Title>

      <ProgressBar
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        subCategoryHasGroups={!!groups.length}
      />

      {false ? (
        <LoaderContainer aria-label="loading..">
          <BounceLoader size={150} color={theme.bg.accent} />
        </LoaderContainer>
      ) : (
        <FormContainer
          size={activeStep === 2 ? "md" : activeStep === 3 ? "lg" : "sm"}
        >
          {activeStep === 1 ? (
            <Category
              categories={categories}
              subCategories={subCategories}
              selectedCategory={selectedCategory[`name_${locale}`]}
              setSelectedCategoryIndex={setSelectedCategoryIndex}
              selectedSubCategory={
                selectedSubCategory && selectedSubCategory[`name_${locale}`]
              }
              setSelectedSubCategoryIndex={setSelectedSubCategoryIndex}
              onStepSubmit={handleStepSubmit}
            />
          ) : activeStep === 2 ? (
            <Details
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              details={details}
              groups={groups}
              selectedGroup={selectedGroup}
              setSelectedGroupIndex={setSelectedGroupIndex}
              selectedDetails={selectedDetails}
              setSelectedDetails={setSelectedDetails}
              selectedMaterials={selectedMaterials}
              setSelectedMaterials={setSelectedMaterials}
              goToPreviousStep={goToPreviousStep}
              onStepSubmit={handleStepSubmit}
              finished={steps[1].finished}
            />
          ) : activeStep === 3 ? (
            <ColorsAndSizes
              colors={colors}
              setColors={setColors}
              goToPreviousStep={goToPreviousStep}
              onStepSubmit={handleStepSubmit}
              finished={steps[2].finished}
            />
          ) : (
            <Price
              price={price}
              setPrice={setPrice}
              salePrice={salePrice}
              setSalePrice={setSalePrice}
              goToPreviousStep={goToPreviousStep}
              onSubmit={handleFormSubmit}
              finished={steps[3].finished}
            />
          )}
        </FormContainer>
      )}
    </Form>
  );
};

const Form = styled.form`
  margin-left: ${(props) =>
    props.contentDirection === "ltr" ? "2em" : "initial"};
  margin-right: ${(props) =>
    props.contentDirection === "ltr" ? "initial" : "2em"};
`;

const Title = styled.h2`
  ${title}
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4em 0;
`;

const FormContainer = styled.div`
  max-width: ${({ size }) =>
    size === "sm" ? "25em" : size === "md" ? "47em" : "52em"};
  padding-bottom: 1em;
`;
export default memo(AddProductForm);
