import { memo, useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { InputWithAffix } from "../../Input/Index";
import { LocaleContext } from "../../../contexts/locale";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import { ErrorIcon, ErrorMsg } from "../style";
import errorIcon from "../../../img/error.svg";
import translations from "../../../translations/strings/addProductPage";
import useTranslation from "../../../hooks/useTranslation";
import time from "../../../shared/time";

const MaterialInputsGroup = ({
  items,
  selectedDetails,
  materialDetailIndex,
  setSelectedDetails,
  errorVisible,
  setErrorVisible,
}) => {
  const { locale } = useContext(LocaleContext);
  const { contentDirection } = useContext(ContentDirectionContext);
  const { t } = useTranslation();

  const [materialsProportions, setMaterialsProportions] = useState(
    items.map((detail) => ({
      name_en: detail.name_en,
      name_ar: detail.name_ar,
      proportion: "",
    }))
  );

  useEffect(() => {
    setErrorVisible(false);

    const totalOfProportions = calculateTotalOfProportions(
      materialsProportions
    );
    if (totalOfProportions !== 100) return;

    const selectedMaterials = materialsProportions.filter(
      (material) => material.proportion
    );

    const sortedMaterials = selectedMaterials.sort((materialA, materialB) => {
      return materialB.proportion - materialA.proportion;
    });

    const materialFinalString_en = getMaterialFinalString(
      sortedMaterials,
      "en"
    );
    const materialFinalString_ar = getMaterialFinalString(
      sortedMaterials,
      "ar"
    );

    const selectedDetailsCopy = selectedDetails.map((detail) =>
      Object.assign({}, detail)
    );
    selectedDetailsCopy[materialDetailIndex].value_en = materialFinalString_en;
    selectedDetailsCopy[materialDetailIndex].value_ar = materialFinalString_ar;
    setSelectedDetails(selectedDetailsCopy);
  }, [materialsProportions]);

  const getMaterialFinalString = useCallback((materials, locale) => {
    const separator = locale === "ar" ? "،" : ",";

    const string = materials.reduce(
      (accumulator, currentMaterial, index, array) => {
        return (accumulator += `${currentMaterial.proportion}% ${
          currentMaterial[`name_${locale}`]
        }${index < array.length - 1 ? `${separator} ` : ""}`);
      },
      ""
    );

    return string;
  }, []);

  const handleChange = useCallback(
    (event, index) => {
      const proportion = Number(event.target.value);

      const materialsProportionsCopy = materialsProportions.map((material) =>
        Object.assign({}, material)
      );
      materialsProportionsCopy[index].proportion = proportion;

      const totalOfProportions = calculateTotalOfProportions(
        materialsProportionsCopy
      );

      if (totalOfProportions > 100) {
        setErrorVisible(true);
        setTimeout(function clearError() {
          setErrorVisible(false);
        }, time.delay.errorMsg);
        return;
      }

      setMaterialsProportions(materialsProportionsCopy);
    },
    [materialsProportions]
  );

  const calculateTotalOfProportions = useCallback((materials) => {
    return materials.reduce((accumulator, currentMaterial) => {
      return accumulator + Number(currentMaterial.proportion);
    }, 0);
  }, []);

  return (
    <>
      <InputsGroup>
        {items.map((item, index) => {
          const label = item[`name_${locale}`];

          return (
            <Label key={index} contentDirection={contentDirection}>
              <InputContainer>
                <InputWithAffix
                  position="suffix"
                  affixText="%"
                  placeholder="0"
                  type="number"
                  min="0"
                  max="100"
                  value={materialsProportions[index].proportion}
                  onChange={(event) => handleChange(event, index)}
                  inputClassname="addProduct__materialInput"
                  required={false}
                />
              </InputContainer>
              {label}
            </Label>
          );
        })}
      </InputsGroup>
      {errorVisible && (
        <ErrorMsg className="materialGroup__errMsg" role="alert">
          {t(translations, "materialsErrorMsg")}
          <ErrorIcon
            contentDirection={contentDirection}
            src={errorIcon}
            alt=""
          />
        </ErrorMsg>
      )}
    </>
  );
};

const InputsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;

  .addProduct__materialInput {
    padding: 0.5em 0.2em;
  }
`;

const Label = styled.label`
  width: 25%;
  padding: 0.2em 0;

  display: flex;
  align-items: center;

  &:not(:last-child) {
    padding-right: ${(props) =>
      props.contentDirection === "ltr" ? ".75em" : "initial"};
    padding-left: ${(props) =>
      props.contentDirection === "ltr" ? "initial" : ".75em"};
  }
`;

const InputContainer = styled.div`
  flex: 0 0 6rem;
  margin-right: 0.3em;
`;

export default memo(MaterialInputsGroup);
