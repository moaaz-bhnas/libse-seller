import { memo, useCallback, useContext } from "react";
import styled from "styled-components";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import useTranslation from "../../../hooks/useTranslation";
import translations from "../../../translations/strings/addProductPage";
import defaultIcon from "../../../img/default.svg";
import removeIcon from "../../../img/cross.svg";
import errorIcon from "../../../img/error.svg";
import { title4 } from "../../Title/style";
import { ErrorIcon, ErrorMsg } from "../style";
import theme from "../../../shared/theme";
import { MultiLanguageSelect } from "../../Input/Index";
import CheckboxesGroup from "./CheckboxesGroup";
import { LocaleContext } from "../../../contexts/locale";
import ImageUploader from "./ImageUploader";

const ColorInputsContainer = ({
  colorIndex,
  color,
  colors,
  setDefaultColor,
  removeColor,
  colorOptions,
  handleColorChange,
  colorError,
  sizeOptions,
  handleSizeChange,
  sizeError,
  addImage,
  imageError,
  removeImage,
}) => {
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);
  const { contentDirection } = useContext(ContentDirectionContext);

  const crossIconVisible = useCallback(
    (index) => {
      const color = colors[index];
      return (
        color[`name_${locale}`] ||
        color.sizes.length > 0 ||
        color.images.length > 0
      );
    },
    [colors]
  );

  return (
    <InputContainer data-default-styles={color.default && colors.length >= 2}>
      <LabelContainer>
        <SubTitle>
          {t(translations, "color")} #{colorIndex + 1}
        </SubTitle>
        {colors.length >= 2 &&
          (color.default ? (
            <DefaultBadge contentDirection={contentDirection}>
              <DefaultIcon
                contentDirection={contentDirection}
                src={defaultIcon}
                alt=""
              />
              {t(translations, "default")}
            </DefaultBadge>
          ) : (
            <DefaultButton
              contentDirection={contentDirection}
              onClick={() => setDefaultColor(colorIndex)}
            >
              {t(translations, "setAsDefault")}
            </DefaultButton>
          ))}
        {crossIconVisible(colorIndex) && (
          <RemoveButton
            type="button"
            onClick={(event) => removeColor(event, colorIndex)}
            contentDirection={contentDirection}
            title={t(translations, "removeColor")}
          >
            <RemoveIcon src={removeIcon} alt={t(translations, "removeColor")} />
          </RemoveButton>
        )}
      </LabelContainer>

      <MultiLanguageSelect
        options={colorOptions}
        value={color[`name_${locale}`]}
        onChange={(optionIndex) => handleColorChange(optionIndex, colorIndex)}
      />
      {colorError.visible && colorError.index === colorIndex && (
        <ErrorMsg className="inputContainer__errMsg" role="alert">
          {t(translations, "colorErrorMsg")}
          <ErrorIcon
            contentDirection={contentDirection}
            src={errorIcon}
            alt=""
          />
        </ErrorMsg>
      )}

      <SizesSelectContainer>
        <AvailableSizes contentDirection={contentDirection}>
          {t(translations, "availableSizes")}:
        </AvailableSizes>
        <CheckboxesGroup
          name="sizes"
          items={sizeOptions}
          multiLanguage={false}
          required={true}
          onChange={({ event, index: optionIndex }) =>
            handleSizeChange(event, optionIndex, colorIndex)
          }
          selectedItems={color.sizes}
          itemsPerRow={5}
          inline
        />
      </SizesSelectContainer>
      {sizeError.visible && sizeError.index === colorIndex && (
        <ErrorMsg className="inputContainer__errMsg" role="alert">
          {t(translations, "sizeErrorMsg")}
          <ErrorIcon
            contentDirection={contentDirection}
            src={errorIcon}
            alt=""
          />
        </ErrorMsg>
      )}

      <ImageUploader
        gallery={color.images}
        addImage={(image) => addImage(colorIndex, image)}
        removeImage={(imageIndex) => removeImage(colorIndex, imageIndex)}
      />
      {imageError.visible && imageError.index === colorIndex && (
        <ErrorMsg className="inputContainer__errMsg" role="alert">
          {t(translations, "imageErrorMsg")}
          <ErrorIcon
            contentDirection={contentDirection}
            src={errorIcon}
            alt=""
          />
        </ErrorMsg>
      )}
    </InputContainer>
  );
};

const SubTitle = styled.h4`
  ${title4};
  margin: 0;
`;

const AvailableSizes = styled.p`
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: ${(props) =>
    props.contentDirection === "ltr" ? ".75em" : "initial"};
  margin-left: ${(props) =>
    props.contentDirection === "rtl" ? ".75em" : "initial"};
`;

const InputContainer = styled.div`
  position: relative;
  flex: 0 1 25em;

  .inputContainer__errMsg {
    margin: -0.2em 0 0.65em;
  }
`;

const LabelContainer = styled.div`
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RemoveButton = styled.button`
  background-color: transparent;
  width: 3em;
  border: none;
  padding: 0.9em;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: ${(props) =>
    props.contentDirection === "ltr" ? "-0.9em" : ".5em"};
  margin-left: ${(props) =>
    props.contentDirection === "rtl" ? "-0.9em" : ".5em"};

  &:hover {
    opacity: 0.6;
  }
`;

const RemoveIcon = styled.img`
  width: 100%;
`;

const DefaultButton = styled.button`
  margin-left: ${(props) =>
    props.contentDirection === "ltr" ? "auto" : "initial"};
  margin-right: ${(props) =>
    props.contentDirection === "rtl" ? "auto" : "initial"};
`;

const DefaultBadge = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  margin-left: ${(props) =>
    props.contentDirection === "ltr" ? "auto" : "initial"};
  margin-right: ${(props) =>
    props.contentDirection === "rtl" ? "auto" : "initial"};

  color: ${theme.text.success};

  display: flex;
  align-items: center;
  font-weight: 500;
`;

const DefaultIcon = styled.img`
  width: 1em;
  margin-right: ${(props) =>
    props.contentDirection === "ltr" ? ".25em" : "initial"};
  margin-left: ${(props) =>
    props.contentDirection === "rtl" ? ".25em" : "initial"};
`;

const SizesSelectContainer = styled.div`
  display: flex;
  margin-bottom: 0.8em;
`;

export default memo(ColorInputsContainer);
