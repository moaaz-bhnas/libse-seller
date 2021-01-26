import { memo, useContext } from "react";
import styled from "styled-components";
import measurements from "../../shared/measurements";
import { title } from "../../components/Title/style";
import theme from "../../shared/theme";
import formatPrice from "../../utils/formatPrice";
import { LocaleContext } from "../../contexts/locale";
import AvailableColors from "../AvailableColors/Index";
import useTranslation from "../../hooks/useTranslation";
import strings from "../../translations/strings/productPage";
import AvailableSizes from "./components/AvailableSizes";
import Details from "./components/Details";

const ProductDetails = ({ product, activeColor, onColorClick }) => {
  console.log("product: ", product);
  const { locale } = useContext(LocaleContext);
  const { t } = useTranslation(locale);

  const { name, price, colors } = product;
  return (
    <StyledProductDetails>
      <Title>{name}</Title>
      <Price>{formatPrice(locale, price)}</Price>
      <AvailableColors
        colors={colors}
        activeColor={activeColor}
        onClick={({ index }) => onColorClick(index)}
        namesVisible={true}
      />

      <Hr />

      <SubTitle>{t(strings, "availableSizes")}</SubTitle>
      <AvailableSizes sizes={activeColor.sizes} />

      <Hr />

      <SubTitle>{t(strings, "details")}</SubTitle>
      <Details details={product.details} materials={product.materials} />
    </StyledProductDetails>
  );
};

const StyledProductDetails = styled.div`
  position: sticky;
  top: ${measurements.height.header};
  padding: 2em 2em 2em 8%;
`;

const Title = styled.h2`
  ${title}
  margin: 0;
`;

const Price = styled.p`
  color: ${theme.text.interactive};
  font-size: 1.05rem;
  margin: 0.25em 0 2.5em;
`;

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: ${theme.border.grey};
  margin: 1.5em 0;
`;

const SubTitle = styled.h3``;

export default memo(ProductDetails);
