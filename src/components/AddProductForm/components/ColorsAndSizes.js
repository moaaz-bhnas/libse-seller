import { memo, useCallback, useState, useEffect, useContext } from "react";
import { ButtonsContainer } from "../style";
import { NextButton, PreviousButton } from "../../Button/Index";
import styled from "styled-components";
import { title3 } from "../../Title/style";
import useTranslation from "../../../hooks/useTranslation";
import translations from "../../../translations/strings/addProductPage";
import { LocaleContext } from "../../../contexts/locale";
import ColorsNumber from "./ColorsNumber";
import ColorInputsContainer from "./ColorInputsContainer";

const sizeOptions = [
  { name: "xs" },
  { name: "s" },
  { name: "m" },
  { name: "l" },
  { name: "xl" },
  { name: "xxl" },
  { name: "xxxl" },
];

const colorOptions = [
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

  const selectColorOptions = colorOptions.map((option, index) => ({
    ...option,
    label: option[`name_${locale}`],
    value: index,
  }));

  const selectSizeOptions = sizeOptions.map((option, index) => ({
    ...option,
    label: option.name,
    value: index,
  }));

  const [colorsNumber, setColorsNumber] = useState(colors.length);
  const [colorsNumberError, setColorsNumberError] = useState({
    visible: false,
    colorsToClear: 0,
  });
  const [colorError, setColorError] = useState({ visible: false, index: null });
  const [sizeError, setSizeError] = useState({ visible: false, index: null });
  const [imageError, setImageError] = useState({ visible: false, index: null });

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

  const handleColorChange = useCallback(
    (option, colorIndex) => {
      if (option) setColorError({ visible: false, index: null });

      const updatedColors = colors.map((color, i) => {
        if (i === colorIndex) {
          color.name_en = option.name_en;
          color.name_ar = option.name_ar;
        }
        return color;
      });
      setColors(updatedColors);
    },
    [colors]
  );

  const handleSizeChange = useCallback(
    (options, colorIndex) => {
      console.log("options: ", options);
      setSizeError({ visible: false, index: null });

      const updatedColors = colors.map((color, i) => {
        if (i === colorIndex) {
          color.sizes = options;
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

  const addImage = useCallback(
    (colorIndex, image) => {
      if (imageError.visible) setImageError({ visible: false, index: null });

      const updatedColors = colors.map((color, i) => {
        if (i === colorIndex) {
          color.images.push({ ...image, order: color.images.length + 1 });
        }
        return color;
      });
      setColors(updatedColors);
    },
    [colors, imageError.visible]
  );

  const removeImage = useCallback(
    (colorIndex, imageIndex) => {
      const updatedColors = colors.map((color, i) => {
        if (i === colorIndex) {
          color.images.splice(imageIndex, 1);
        }
        return color;
      });
      setColors(updatedColors);
    },
    [colors]
  );

  const handleImageOrderChange = useCallback(
    (colorIndex, imageIndex, newOrder) => {
      const updatedColors = colors.map((color, index) => {
        if (index === colorIndex) {
          const oldOrder = color.images[imageIndex].order;
          color.images.forEach((image) => {
            if (image.order === newOrder) {
              image.order = oldOrder;
            }
          });
          color.images[imageIndex].order = newOrder;
        }
        return color;
      });
      setColors(updatedColors);
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
        } else if (color.images.length < 3) {
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

  return (
    <>
      <Title>{t(translations, "colorsSizes")}</Title>

      <ColorsNumber
        colors={colors}
        setColors={setColors}
        colorsNumber={colorsNumber}
        setColorsNumber={setColorsNumber}
        colorsNumberError={colorsNumberError}
        setColorsNumberError={setColorsNumberError}
      />

      <ColorsContainer>
        {colors.map((color, colorIndex) => {
          return (
            <ColorInputsContainer
              key={colorIndex}
              colorIndex={colorIndex}
              color={color}
              colors={colors}
              setDefaultColor={setDefaultColor}
              removeColor={removeColor}
              colorOptions={selectColorOptions}
              handleColorChange={handleColorChange}
              colorError={colorError}
              sizeOptions={selectSizeOptions}
              handleSizeChange={handleSizeChange}
              sizeError={sizeError}
              addImage={addImage}
              removeImage={removeImage}
              onImageOrderChange={handleImageOrderChange}
              imageError={imageError}
            />
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
  margin-bottom: .6em;
`;

const ColorsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default memo(ColorsAndSizes);
