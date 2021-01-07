import { memo, useState, useCallback, useContext } from "react";
import Link from "next/link";
import LikeSvg from "../../../svgs/Heart";
import { addToFavorites, removeFromFavorites } from "../../../api/firebase";
import { AuthContext } from "../../../contexts/auth";
import { LocaleContext } from "../../../contexts/locale";
// import ImageSlider from "../../ImageSlider/Index";
import formatPrice from "../../../utils/formatPrice";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import styled from "styled-components";
import theme from "../../../shared/theme";
import AvailableColors from "../../AvailableColors/Index";
import Preview from "./Preview";

const Product = ({ product, seller, inFavorites }) => {
  const { colors } = product;
  const {
    user: { uid: userId },
  } = useContext(AuthContext);

  // language
  const { locale } = useContext(LocaleContext);

  // content direction
  const { contentDirection } = useContext(ContentDirectionContext);

  const defaultColor =
    product.colors.find((color) => color.default) || colors[0];
  const [activeColor, setActiveColor] = useState(defaultColor);
  const { images } = activeColor;
  const href = `/${locale}/product/${product.id}?color=${activeColor.name_en}`;

  const handleLikeToggle = useCallback(() => {
    console.log("userId: ", userId);
    inFavorites
      ? removeFromFavorites(userId, product.id)
      : addToFavorites(userId, product.id);
  }, [inFavorites]);

  return (
    <StyledProduct key={product.id}>
      <ProductContainer>
        <Link passHref href={href}>
          <PreviewLink>
            <Preview images={images.length > 1 ? images.slice(1) : images} />
          </PreviewLink>
        </Link>

        {colors.length > 1 && (
          <AvailableColors
            colors={colors}
            activeColor={activeColor}
            onClick={({ index }) => setActiveColor(colors[index])}
            styles={{
              justifyContent: "center",
              margin: "0 auto 0.65em",
              maxWidth: "15em",
            }}
          />
        )}

        <Link passHref href={href}>
          <NameLink>
            <ProductName>{product.name}</ProductName>
          </NameLink>
        </Link>

        <PriceContainer>
          <Price contentDirection={contentDirection}>
            {/* {product.price} <Abbr title="Egyptian">EGP</Abbr> */}
            {formatPrice(locale, product.price)}
          </Price>
          <LikeButton
            aria-label="Add to favorites"
            data-favorite={inFavorites}
            onClick={handleLikeToggle}
            onMouseDown={(e) => e.preventDefault()}
            contentDirection={contentDirection}
          >
            <LikeSvg className="product__likeSvg" />
          </LikeButton>
        </PriceContainer>
      </ProductContainer>
    </StyledProduct>
  );
};

const StyledProduct = styled.li`
  flex: 0 0 33.333%;
  padding: 0 1em;
  margin-bottom: 2em;

  display: flex;
`;

const ProductContainer = styled.article`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const PreviewLink = styled.a`
  margin-bottom: 0.5em;
`;

const NameLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const ProductName = styled.p`
  margin: 0.2em auto;
  text-align: center;
  max-width: 15em;
  line-height: 1.25;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Price = styled.p`
  color: ${theme.text.interactive};
  margin-top: 0;
  margin-bottom: 0;
  margin-right: ${(props) => (props.contentDirection === "ltr" ? ".2em" : "0")};
  margin-left: ${(props) => (props.contentDirection === "ltr" ? "0" : ".2em")};
`;

const Abbr = styled.abbr`
  text-decoration: none;
  font-variant: all-small-caps;
`;

const LikeButton = styled.button`
  width: 2.5em;
  height: 2.5em;
  display: flex;
  background: transparent;
  border: none;
  padding: 0.5em;
  margin-right: ${(props) =>
    props.contentDirection === "ltr" ? "-.5em" : "0"};
  margin-left: ${(props) => (props.contentDirection === "ltr" ? "0" : "-.5em")};

  .product__likeSvg {
    width: 100%;
    fill: transparent;
    stroke: ${theme.bg.accent};
    stroke-width: 30;
    transition: 0.1s fill;
  }

  &[data-favorite="true"] {
    .product__likeSvg {
      fill: ${theme.bg.accent};
    }
  }
`;

export default memo(Product);
