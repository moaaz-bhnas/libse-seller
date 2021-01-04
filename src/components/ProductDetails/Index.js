import { memo, useContext } from "react";
import styled from "styled-components";
import measurements from "../../shared/measurements";
import { title } from "../../components/Title/style";
import theme from "../../shared/theme";
import formatPrice from "../../utils/formatPrice";
import { LocaleContext } from "../../contexts/locale";
import AvailableColors from "../AvailableColors";

const ProductDetails = ({ product, activeColor, setActiveColor }) => {
  const { locale } = useContext(LocaleContext);
  console.log(product);
  const { name, price, colors } = product;
  return (
    <StyledProductDetails>
      <Title>{name}</Title>
      <Price>{formatPrice(locale, price)}</Price>
      <AvailableColors
        colors={colors}
        activeColor={activeColor}
        onClick={({ index }) => setActiveColor(colors[index])}
      />
    </StyledProductDetails>
  );
};

const StyledProductDetails = styled.div`
  position: sticky;
  top: ${measurements.height.header};
  padding: 2em;
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

export default memo(ProductDetails);
