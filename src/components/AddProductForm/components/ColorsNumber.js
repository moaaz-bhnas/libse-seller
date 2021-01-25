import { memo, useCallback, useContext } from "react";
import styled from "styled-components";
import { Input } from "../../Input/style";
import { ErrorIcon, ErrorMsg } from "../style";
import errorIcon from "../../../img/error.svg";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import useTranslation from "../../../hooks/useTranslation";
import translations from "../../../translations/strings/addProductPage";
import { LocaleContext } from "../../../contexts/locale";
import time from "../../../shared/time";

const ColorsNumber = ({
  colors,
  setColors,
  colorsNumber,
  setColorsNumber,
  colorsNumberError,
  setColorsNumberError,
}) => {
  const { contentDirection } = useContext(ContentDirectionContext);
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);

  const colorIsEmpty = useCallback((color) => {
    return (
      color[`name_${locale}`] === "" &&
      color.sizes.length === 0 &&
      color.images.length === 0
    );
  }, []);

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
        }, time.delay.errorMsg);
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

  return (
    <>
      <StyledColorsNumber>
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
      </StyledColorsNumber>
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
    </>
  );
};

const StyledColorsNumber = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`;

const Label = styled.label``;

export default memo(ColorsNumber);
