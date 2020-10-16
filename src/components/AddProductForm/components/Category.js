import React, { memo } from "react";
import { NextButton } from "../../Button/Index";
import styled from "styled-components";
import { title3, title4 } from "../../Title/style";
import RadioButtonsGroup from "./RadioButtonsGroup";
import useTranslation from "../../../hooks/useTranslation";
import strings from "../../../translations/strings/addProductPage";

const Information = ({
  categories,
  subCategories,
  selectedCategory,
  setSelectedCategoryIndex,
  selectedSubCategory,
  setSelectedSubCategoryIndex,
  onStepSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t(strings, "productCategory")}</Title>

      <SubTitle>{t(strings, "category")}:</SubTitle>
      <RadioButtonsGroup
        name="category"
        items={categories}
        selectedItem={selectedCategory}
        onChange={({ index }) => setSelectedCategoryIndex(index)}
      />

      <SubTitle>{t(strings, "clothing")}:</SubTitle>
      <RadioButtonsGroup
        name="subcategory"
        items={subCategories}
        selectedItem={selectedSubCategory}
        onChange={({ index }) => setSelectedSubCategoryIndex(index)}
      />

      <NextButton onClick={(event) => onStepSubmit(event)} />
    </>
  );
};

const Title = styled.h3`
  ${title3}
`;

const SubTitle = styled.h4`
  ${title4}
  margin: 0 0 .5em;
`;

export default memo(Information);
