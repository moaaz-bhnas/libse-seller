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
import { LocaleContext } from "../../../contexts/locale";
import ImageUploader from "./ImageUploader";
import Select from "react-select";
import measurements from "../../../shared/measurements";
import strings from "../../../translations/strings/addProductPage";

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
  onImageOrderChange,
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
              type="button"
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

      <Select
        instanceId="colorSelect"
        options={colorOptions}
        value={
          color[`name_${locale}`] ? { label: color[`name_${locale}`] } : null
        }
        onChange={(selectedOption) =>
          handleColorChange(selectedOption, colorIndex)
        }
        placeholder={t(strings, "selectColor")}
        className="colorSelectContainer"
        classNamePrefix="colorSelect"
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

      <Select
        instanceId="sizeSelect"
        isMulti
        closeMenuOnSelect={false}
        options={sizeOptions}
        value={color.sizes}
        onChange={(selectedOptions) =>
          handleSizeChange(selectedOptions, colorIndex)
        }
        placeholder={t(strings, "selectSize")}
        className="sizeSelectContainer"
        classNamePrefix="sizeSelect"
      />
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
        colorIndex={colorIndex}
        onOrderChange={onImageOrderChange}
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

const InputContainer = styled.div`
  position: relative;
  flex: 0 1 25em;

  .inputContainer__errMsg {
    margin: -0.2em 0 0.65em;
  }

  .sizeSelect__control,
  .colorSelect__control {
    border: 1px solid ${theme.border.grey};
    padding: 0.15em 0;
    margin-bottom: 0.075em;
    border-bottom: none;

    &:hover {
      border-color: ${theme.border.grey};
    }
  }

  .colorSelect__control {
    border-top-left-radius: ${measurements.borderRadius.input};
    border-top-right-radius: ${measurements.borderRadius.input};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .sizeSelect__control {
    border-radius: 0;
  }

  .colorSelect__placeholder,
  .sizeSelect__placeholder {
    color: inherit;
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

export default memo(ColorInputsContainer);
