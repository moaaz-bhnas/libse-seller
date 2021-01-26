import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { NextButton, PreviousButton } from "../../Button/Index";
import styled from "styled-components";
import { title3, title4 } from "../../Title/style";
import RadioButtonsGroup from "./RadioButtonsGroup";
import { ErrorIcon, ButtonsContainer } from "../style";
import errorIcon from "../../../img/error.svg";
import theme from "../../../shared/theme";
// import { LanguageContext } from "../../../contexts/language";
import { LocaleContext } from "../../../contexts/locale";
import strings from "../../../translations/strings/addProductPage";
import useTranslation from "../../../hooks/useTranslation";
import MaterialInputsGroup from "./MaterialInputsGroup";
import time from "../../../shared/time";

const Details = ({
  selectedCategory,
  selectedSubCategory,
  groups,
  selectedGroup,
  setSelectedGroupIndex,
  details,
  selectedDetails,
  setSelectedDetails,
  goToPreviousStep,
  onStepSubmit,
  finished,
}) => {
  const { locale } = useContext(LocaleContext);
  const { t } = useTranslation();

  // const [errorVisible, setErrorVisible] = useState(false);
  const [materialErrorVisible, setMaterialErrorVisible] = useState(false);
  useEffect(() => {
    if (materialErrorVisible) {
      setTimeout(function clearError() {
        setMaterialErrorVisible(false);
      }, time.delay.errorMsg);
    }
  }, [materialErrorVisible]);

  const handleSubmit = useCallback(
    (event) => {
      if (!materialDetailIndex.value_en) {
        setMaterialErrorVisible(true);
      }
      onStepSubmit(event, !finished);
    },
    [finished, selectedDetails]
  );

  const materialDetailIndex = selectedDetails.findIndex(
    (detail) => detail.name_en === "Material"
  );
  const materialDetail =
    materialDetailIndex && selectedDetails[materialDetailIndex];

  return (
    <>
      <Breadcrumbs>
        {selectedCategory[`name_${locale}`] + " "} /{" "}
        {selectedSubCategory[`name_${locale}`] + " "} /{" "}
        {selectedGroup[`name_${locale}`]}
      </Breadcrumbs>

      <Title>{t(strings, "productDetails")}</Title>

      {/* {Object.keys(selectedDetails).length < 2 && (
        <P role="alert" error={errorVisible}>
          At least <B>2</B> options must be checked.
          {errorVisible && <ErrorIcon contentDirection={contentDirection} src={errorIcon} alt="" />}
        </P>
      )} */}

      <SubTitle>{t(strings, "group")}:</SubTitle>
      <RadioButtonsGroup
        name="group"
        items={groups}
        selectedItem={selectedGroup[`name_${locale}`]}
        onChange={({ index }) => setSelectedGroupIndex(index)}
        itemsPerRow={4}
        required={true}
      />

      {details
        .filter((detail) => detail.name_en !== "Material")
        .map((detail, detailIndex) => (
          <React.Fragment key={detailIndex}>
            <SubTitle>{detail[`name_${locale}`]}:</SubTitle>
            <RadioButtonsGroup
              name={detail[`name_${locale}`]}
              items={detail.options}
              selectedItem={selectedDetails[detailIndex][`value_${locale}`]}
              onChange={({ index: optionIndex }) => {
                const option = detail.options[optionIndex];

                const selectedDetailsCopy = selectedDetails.map((detail) =>
                  Object.assign({}, detail)
                );
                selectedDetailsCopy[detailIndex].value_ar = option.name_ar;
                selectedDetailsCopy[detailIndex].value_en = option.name_en;

                setSelectedDetails(selectedDetailsCopy);
              }}
              itemsPerRow={4}
              required={detail.required}
            />
          </React.Fragment>
        ))}

      {materialDetail && (
        <>
          <SubTitle>{materialDetail[`name_${locale}`]}:</SubTitle>
          <MaterialInputsGroup
            items={materialDetail.value}
            materialDetailIndex={materialDetailIndex}
            selectedDetails={selectedDetails}
            setSelectedDetails={setSelectedDetails}
            errorVisible={materialErrorVisible}
            setErrorVisible={setMaterialErrorVisible}
          />
        </>
      )}

      <ButtonsContainer>
        <PreviousButton onClick={goToPreviousStep} />
        <NextButton disabled={!finished} onClick={handleSubmit} />
      </ButtonsContainer>
    </>
  );
};

const Title = styled.h3`
  ${title3}
`;

export const Breadcrumbs = styled.p`
  color: ${theme.text.grey};
`;

// const P = styled.p`
//   display: flex;
//   align-items: center;
//   color: ${({ error }) => (error ? theme.text.warning : "inherit")};
// `;

// const B = styled.b`
//   margin: 0 0.3em;
// `;

const SubTitle = styled.h4`
  ${title4}
  margin: 0 0 .5em;
`;

export default memo(Details);
