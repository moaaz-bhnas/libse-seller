import { memo, useCallback, useContext } from "react";
import styled from "styled-components";
import { InputWithAffix } from "../../Input/Index";
import { LocaleContext } from "../../../contexts/locale";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import { ErrorIcon, ErrorMsg } from "../style";
import errorIcon from "../../../img/error.svg";
import translations from "../../../translations/strings/addProductPage";
import useTranslation from "../../../hooks/useTranslation";
import cloneArrayOfObjects from "../../../utils/cloneArrayOfObjects";
import calculateProportionsTotal from "../../../utils/calculateMaterialsProportionsTotal";

const MaterialInputsGroup = ({
  selectedMaterials,
  setSelectedMaterials,
  errorVisible,
  setErrorVisible,
}) => {
  const { locale } = useContext(LocaleContext);
  const { contentDirection } = useContext(ContentDirectionContext);
  const { t } = useTranslation();

  const handleChange = useCallback(
    (event, index) => {
      const proportion = Number(event.target.value);
      // console.log("proportion: ", proportion);

      const selectedMaterialsCopy = cloneArrayOfObjects(selectedMaterials);
      selectedMaterialsCopy[index].proportion = proportion;

      const proportionsTotal = calculateProportionsTotal(selectedMaterialsCopy);
      if (proportionsTotal > 100) {
        setErrorVisible(true);
        return;
      }

      setSelectedMaterials(selectedMaterialsCopy);
    },
    [selectedMaterials]
  );

  return (
    <>
      <InputsGroup>
        {selectedMaterials.map((material, index) => {
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
                  value={material.proportion.toString()}
                  onChange={(event) => handleChange(event, index)}
                  inputClassname="addProduct__materialInput"
                  required={false}
                />
              </InputContainer>
              {material[`name_${locale}`]}
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
