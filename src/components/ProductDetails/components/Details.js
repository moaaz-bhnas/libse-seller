import { memo, useCallback, useContext } from "react";
import styled from "styled-components";
import { LocaleContext } from "../../../contexts/locale";
import useTranslation from "../../../hooks/useTranslation";
import strings from "../../../translations/strings/productPage";

const Details = ({ details, materials }) => {
  const { locale } = useContext(LocaleContext);
  const { t } = useTranslation();

  const formMaterialsString = useCallback((materials) => {
    return materials.reduce((accumulator, current, index, array) => {
      const last = index === array.length - 1;
      const separator = locale === "ar" ? "،" : ",";
      return (accumulator += `${current.proportion}% ${
        current[`name_${locale}`]
      }${!last ? `${separator} ` : ""}`);
    }, "");
  }, []);

  return (
    <StyledDetails>
      {details.map((detail, index) => (
        <Detail key={index}>
          {detail[`name_${locale}`]}: {detail[`value_${locale}`]}
        </Detail>
      ))}
      {materials && (
        <Detail>
          {t(strings, "materials")}: {formMaterialsString(materials)}
        </Detail>
      )}
    </StyledDetails>
  );
};

const StyledDetails = styled.ul`
  padding-left: 0;
  list-style-position: inside;
`;

const Detail = styled.li`
  margin: 0.2em 0;
`;

export default memo(Details);
