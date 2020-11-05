import { memo, useCallback, useState, useEffect, useContext } from "react";
// import Select from "react-select";
import { ErrorIcon, ErrorMsg, ButtonsContainer } from "../style";
import { NextButton, PreviousButton } from "../../Button/Index";
import removeIcon from "../../../img/cross.svg";
import ImageUploader from "./ImageUploader";
import { Input } from "../../Input/style";
import errorIcon from "../../../img/error.svg";
import defaultIcon from "../../../img/default.svg";
import styled from "styled-components";
import { title3, title4 } from "../../Title/style";
import theme from "../../../shared/theme";
import measurements from "../../../shared/measurements";
import uploadIcon from "../../../img/upload.svg";
import useTranslation from "../../../hooks/useTranslation";
import translations from "../../../translations/strings/addProductPage";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import { MultiLanguageSelect } from "../../Input/Index";
import { LocaleContext } from "../../../contexts/locale";
import CheckboxesGroup from "./CheckboxesGroup";

const sizeOptions = [
  { name: "xs" },
  { name: "s" },
  { name: "m" },
  { name: "l" },
  { name: "xl" },
];

const colorOptions = [
  { name_en: "--Pick a color--", name_ar: "--اختر لون--" },
  { name_en: "black", name_ar: "أسود" },
  { name_en: "grey", name_ar: "رمادي" },
  { name_en: "white", name_ar: "أبيض" },
  { name_en: "brown", name_ar: "بني" },
  { name_en: "beige", name_ar: "بيج" },
  { name_en: "red", name_ar: "أحمر" },
  { name_en: "pink", name_ar: "وردي" },
  { name_en: "orange", name_ar: "برتقالي" },
  { name_en: "ivory", name_ar: "إيفوري" },
  { name_en: "green", name_ar: "أخضر" },
  { name_en: "blue", name_ar: "أزرق" },
  { name_en: "purple", name_ar: "بنفسجي" },
  { name_en: "gold", name_ar: "ذهبي" },
  { name_en: "silver", name_ar: "فضي" },
  { name_en: "multi", name_ar: "متعدد الألوان" },
];

const ColorsAndSizes = ({
  colors,
  setColors,
  onStepSubmit,
  goToPreviousStep,
  finished,
}) => {
  const { t } = useTranslation();

  const { locale } = useContext(LocaleContext);
  const contentDirection = useContext(ContentDirectionContext);

  const [colorsNumber, setColorsNumber] = useState(colors.length);
  const [colorsNumberError, setColorsNumberError] = useState({
    visible: false,
    colorsToClear: 0,
  });
  const [colorError, setColorError] = useState({ visible: false, index: null });
  const [sizeError, setSizeError] = useState({ visible: false, index: null });
  const [imageError, setImageError] = useState({ visible: false, index: null });
  console.log(
    "colors: ",
    colors,
    "colorError: ",
    colorError,
    "sizeError: ",
    sizeError,
    "imageError: ",
    imageError
  );

  // const colorIsValid = useCallback((color) => {
  //   return color.value !== 0 && color.sizes.length > 0 && color.images.length > 0;
  // }, [])

  useEffect(
    function checkColorsStateAndSetDefaultColor() {
      const validColorIndex = colors.findIndex(
        (color) =>
          color[`name_${locale}`] && color.sizes.length && color.images.length
      );
      const noDefaultColor = !colors.some((color) => color.default);

      if (validColorIndex !== -1 && noDefaultColor) {
        const updatedColors = colors.map((color, i) => {
          if (i === validColorIndex) {
            color.default = true;
          }
          return color;
        });
        setColors(updatedColors);
      }
    },
    [colors]
  );

  const handleColorsNumberChange = useCallback(
    ({ target: { value: newNumber } }) => {
      if (newNumber > colorsNumber) {
        addColorInputs(newNumber);
      } else if (newNumber < colorsNumber) {
        removeColorInputs(newNumber);
      }
    },
    [colors, colorsNumber]
  );

  const addColorInputs = useCallback(
    (newNumber) => {
      setColorsNumber(newNumber);
      const difference = newNumber - colors.length;
      const emptyColor = {
        name_ar: "",
        name_en: "",
        sizes: [],
        images: [],
        default: false,
      };
      const newColors = Array(difference).fill(emptyColor);
      setColors(colors.concat(newColors));
    },
    [colors, colorsNumber]
  );

  const removeColorInputs = useCallback(
    (newNumber) => {
      const difference = colors.length - newNumber;
      const emptyColors = colors.filter(
        (color) =>
          color[`name_${locale}`] === "" &&
          color.sizes.length === 0 &&
          color.images.length === 0
      ).length;
      const colorHasToBeCleared = difference > emptyColors;
      const unremovableColors = colorHasToBeCleared
        ? difference - emptyColors
        : 0;
      if (colorHasToBeCleared) {
        setColorsNumberError({
          visible: true,
          colorsToClear: unremovableColors,
        });
        setTimeout(function clearError() {
          setColorsNumberError({ visible: false, colorsToClear: 0 });
        }, 10000);
      }
      setColorsNumber(Number(newNumber) + Number(unremovableColors));
      let removedColors = 0;
      const newColors = colors.filter((color) => {
        if (colorIsEmpty(color) && removedColors < difference) {
          removedColors++;
          return false;
        } else {
          return true;
        }
      });
      setColors(newColors);
    },
    [colors, colorsNumber]
  );

  const colorIsEmpty = useCallback((color) => {
    return (
      color[`name_${locale}`] === "" &&
      color.sizes.length === 0 &&
      color.images.length === 0
    );
  }, []);

  const handleColorChange = useCallback(
    (optionIndex, colorIndex) => {
      if (optionIndex) setColorError({ visible: false, index: null });

      const updatedColors = colors.map((color, i) => {
        if (i === colorIndex) {
          color.name_en = colorOptions[optionIndex].name_en;
          color.name_ar = colorOptions[optionIndex].name_ar;
        }
        return color;
      });
      setColors(updatedColors);
    },
    [colors]
  );

  const handleSizeChange = useCallback(
    (event, optionIndex, colorIndex) => {
      setSizeError({ visible: false, index: null });

      const size = sizeOptions[optionIndex].name;

      const updatedColors = colors.map((color, i) => {
        if (i === colorIndex) {
          if (event.target.checked) {
            color.sizes.push(size);
          } else {
            const indexToRemove = color.sizes.indexOf(size);
            color.sizes.splice(indexToRemove, 1);
          }
        }
        return color;
      });
      setColors(updatedColors);
    },
    [colors]
  );

  const removeColor = useCallback(
    (event, index) => {
      event.preventDefault();
      if (colorsNumberError.visible)
        setColorsNumberError({ visible: false, colorsToClear: 0 });

      const isLastColor = colors.length === 1;
      const updatedColors = isLastColor
        ? [{ name_ar: "", name_en: "", sizes: [], images: [], default: false }]
        : colors.filter((color, i) => i !== index);
      setColors(updatedColors);

      if (!isLastColor) {
        setColorsNumber(colorsNumber - 1);
      }
    },
    [colors, colorsNumber]
  );

  const handleImageChange = useCallback(
    (imageFiles, imageDataURLs, index) => {
      console.log("imageFiles: ", imageFiles, "imageDataURLs: ", imageDataURLs);
      if (imageError.visible) setImageError({ visible: false, index: null });

      const images = imageFiles
        ? imageFiles.map((file, index) => {
            return { file, dataURL: imageDataURLs[index] };
          })
        : [];

      const updatedColors = colors.map((color, i) => {
        if (i === index) {
          color.images = images;
        }
        return color;
      });
      setColors(updatedColors);
    },
    [colors, imageError.visible]
  );

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

  const handleSubmit = useCallback(
    (event) => {
      onStepSubmit(event, !finished);

      colors.forEach((color, index) => {
        if (color[`name_${locale}`] === "") {
          setColorError({ visible: true, index });
        } else if (color.sizes.length === 0) {
          setSizeError({ visible: true, index });
        } else if (color.images.length === 0) {
          setImageError({ visible: true, index });
        }
      });
    },
    [finished, colors, colorError, sizeError, imageError]
  );

  const setDefaultColor = useCallback(
    (index) => {
      const updatedColors = colors.map((color, i) => {
        color.default = i === index;
        return color;
      });
      setColors(updatedColors);
    },
    [colors]
  );

  console.log("colors: ", colors);
  return (
    <>
      <Title>{t(translations, "colorsSizes")}</Title>

      <ColorsNumber>
        <Label htmlFor="productForm__colorsNumber">
          {t(translations, "numberOfColors")}:
        </Label>
        <Input
          data-tiny="true"
          id="productForm__colorsNumber"
          type="number"
          value={colorsNumber}
          onChange={handleColorsNumberChange}
          required
          min="1"
          max="10"
          contentDirection={contentDirection}
        />
      </ColorsNumber>
      {colorsNumberError.visible && (
        <ErrorMsg role="alert">
          You must clear {colorsNumberError.colorsToClear} of the filled colors
          <ErrorIcon
            contentDirection={contentDirection}
            src={errorIcon}
            alt=""
          />
        </ErrorMsg>
      )}

      <ColorsContainer>
        {colors.map((color, colorIndex) => {
          return (
            <InputContainer
              key={colorIndex}
              data-default-styles={color.default && colors.length >= 2}
            >
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
                  >
                    <RemoveIcon
                      src={removeIcon}
                      alt={t(translations, "removeColor")}
                    />
                  </RemoveButton>
                )}
              </LabelContainer>

              <MultiLanguageSelect
                options={colorOptions}
                value={color[`name_${locale}`]}
                onChange={(optionIndex) =>
                  handleColorChange(optionIndex, colorIndex)
                }
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

              <ImageUploader />
              {/* <ImageUploader
                className="productForm__imageUploader"
                buttonClassName="productForm__imageUploaderButton"
                pictures={color.images.map((image) => image.dataURL)}
                files={color.images.map((image) => image.file)}
                onChange={(imageFiles, imageDataURLs) =>
                  handleImageChange(imageFiles, imageDataURLs, colorIndex)
                }
                imgExtension={[".jpg", ".png", ".jpeg"]}
                withPreview={true}
                label={t(translations, "imageUploaderLabel")}
                withIcon={false}
                buttonText={t(translations, "chooseImage")}
                singleImage
              /> */}
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
        })}
      </ColorsContainer>

      <ButtonsContainer>
        <PreviousButton onClick={goToPreviousStep} />
        <NextButton
          disabled={!finished}
          onClick={handleSubmit}
          positionedAbsolutely={colors.length === 1}
        />
      </ButtonsContainer>
    </>
  );
};

// styles
const Title = styled.h3`
  ${title3}
`;

const SubTitle = styled.h4`
  ${title4}
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

const ColorsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const InputContainer = styled.div`
  position: relative;
  flex: 0 1 25em;

  .inputContainer__errMsg {
    margin: -0.2em 0 0.65em;
  }
  /* .productForm__imageUploader {
    margin-bottom: 1.25em;

    .fileContainer {
      box-shadow: none;
      border: 1px solid ${theme.border.grey};
      border-radius: ${measurements.borderRadius.input};
    }

    .deleteImage {
      background-color: ${theme.bg.accent};
    }
  } */

  /* .productForm__imageUploaderButton {
    background-color: ${theme.bg.accent};
    transition-property: box-shadow, background-color;
    transition-duration: 0.15s;
    border-radius: ${measurements.borderRadius.input};
    display: flex;
    align-items: center;

    &:hover {
      background-color: #c2715f;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.2rem rgba(215, 126, 106, 0.5);
    }

    &::after {
      content: url(${uploadIcon});
      width: 1em;
      display: inline-block;
      margin-inline-start: 0.75em;
    }
  } */
`;

const ColorsNumber = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`;

const LabelContainer = styled.div`
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label``;

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

export default memo(ColorsAndSizes);
