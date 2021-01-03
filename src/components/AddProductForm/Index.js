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

const AddProductForm = () => {
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
  useUpdateEffect(
    function clearSelectedDetails() {
      setSelectedDetails(
        selectedDetails.map((detail) => {
          return { ...detail, value_ar: "", value_en: "" };
        })
      );
    },
    [selectedCategoryIndex, selectedSubCategoryIndex, selectedGroupIndex]
  ); // re-render
  useUpdateEffect(
    function updateDetailsStepVisibilityState() {
      if (!groups.length) {
        stepsDispatch({
          type: "updateFinishAndVisibilityStates",
          payload: { stepId: 2, visible: false, finished: true },
        });
      } else {
        stepsDispatch({
          type: "updateVisibilityState",
          payload: { stepId: 2, visible: true },
        });
      }
    },
    [groups] // try groups.length if u face an error
  );

  const { details } = selectedGroup;
  const [selectedDetails, setSelectedDetails] = useState(
    details.map(({ name_ar, name_en, required }) => {
      return { name_ar, name_en, value_ar: "", value_en: "", required };
    })
  );
  useUpdateEffect(
    function updateDetailsStepFinishState() {
      const stepFinished = selectedDetails
        .filter((detail) => detail.required)
        .every((detail) => detail.value_ar && detail.value_en);

      console.log(
        "stepFinished: ",
        stepFinished,
        "details: ",
        details,
        "selectedDetails: ",
        selectedDetails
      );
      stepsDispatch({
        type: "updateFinishState",
        payload: { stepId: 2, finished: stepFinished },
      });
    },
    [selectedDetails, details]
  );

  const [description, setDescription] = useState("Description"); // Not sure about removing this option yet

  const [colors, setColors] = useState([
    { name_ar: "", name_en: "", sizes: [], images: [], default: false },
  ]);
  useUpdateEffect(
    function updateColorsStepFinishState() {
      const stepFinished = colors.every(
        (color) =>
          color[`name_${locale}`] && color.sizes.length && color.images.length
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
      visible: true, // true due to the default values
    },
    {
      id: 2,
      translationKey: "details",
      Icon: DetailsSvg,
      finished: Object.keys(selectedDetails).length !== 0, // to be improved
      finished: false,
      visible: true,
    },
    {
      id: 3,
      translationKey: "colorsSizes",
      Icon: ColorsSvg,
      finished: false,
      visible: true,
    },
    {
      id: 4,
      translationKey: "price",
      Icon: PriceSvg,
      finished: false,
      visible: true,
    },
  ];
  const stepsReducer = (steps, action) => {
    const { stepId: id, finished, visible } = action.payload;
    switch (action.type) {
      case "updateFinishState":
        return steps.map((step) => {
          if (step.id === id) {
            step.finished = finished;
          }
          return step;
        });
      case "updateVisibilityState":
        return steps.map((step) => {
          if (step.id === id) {
            step.visible = visible;
          }
          return step;
        });
      case "updateFinishAndVisibilityStates":
        return steps.map((step) => {
          if (step.id === id) {
            step.visible = visible;
            step.finished = finished;
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
      // Naming login goes here ..

      const category = categories[selectedCategoryIndex];
      const product = {
        name: productName,
        category_ar: category.name_ar,
        category_en: category.name_en,
        sub_category_ar:
          category.subCategories[selectedSubCategoryIndex].name_ar,
        sub_category_en:
          category.subCategories[selectedSubCategoryIndex].name_en,
        details: selectedDetails,
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
      steps,
      productName,
      selectedCategoryIndex,
      selectedSubCategoryIndex,
      description,
      colors,
      price,
    ]
  );

  return (
    <Form contentDirection={contentDirection} onSubmit={handleFormSubmit}>
      <Title>{t(strings, "addProduct")}</Title>

      <ProgressBar
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        subCategoryHasGroups={!!groups.length}
      />

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

const FormContainer = styled.div`
  max-width: ${({ size }) =>
    size === "sm" ? "25em" : size === "md" ? "47em" : "52em"};
  padding-bottom: 1em;
`;
export default memo(AddProductForm);
