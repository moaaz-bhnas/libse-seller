import { memo, useState, useCallback, useContext } from "react";
import Link from "next/link";
import LikeSvg from "../../../svgs/Heart";
import { addToFavorites, removeFromFavorites } from "../../../api/firebase";
import { AuthContext } from "../../../contexts/auth";
import { LocaleContext } from "../../../contexts/locale";
import ImageSlider from "../../ImageSlider/Index";
import formatPrice from "../../../utils/formatPrice";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import styled from "styled-components";
import theme from "../../../shared/theme";

const Product = ({ product, seller, inFavorites }) => {
  const { uid: userId } = useContext(AuthContext);

  // language
  const { locale } = useContext(LocaleContext);

  // content direction
  const { contentDirection } = useContext(ContentDirectionContext);

  const defaultColor =
    product.colors.find((color) => color.default) || colors[0];
  const [activeColor, setActiveColor] = useState(defaultColor);
  const href = `/${locale}/product/${product.id}?color=${activeColor.name_en}`;

  const handleLikeToggle = useCallback(() => {
    inFavorites
      ? removeFromFavorites(userId, product.id)
      : addToFavorites(userId, product.id);
  }, [inFavorites]);

  return (
    <StyledProduct key={product.id}>
      <ProductContainer>
        <Link passHref href={href}>
          <ProductLink>
            <ImageSlider
              className="productsGrid__imageSlider"
              images={activeColor.images}
              height="22em"
            />
          </ProductLink>
        </Link>

        {product.colors.length > 1 && (
          <Colors>
            {product.colors.map((color, index, colors) => (
              <Color key={color[`name_${locale}`]}>
                <ColorButton
                  aria-label={color[`name_${locale}`]}
                  color={color.name_en}
                  onClick={() => setActiveColor(colors[index])}
                  title={color[`name_${locale}`]}
                  data-active={color.name_en === activeColor.name_en}
                  onMouseDown={(e) => e.preventDefault()}
                />
              </Color>
            ))}
          </Colors>
        )}

        <Link href={href}>
          <ProductLink>
            <ProductName>{product.name}</ProductName>
          </ProductLink>
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

const ProductContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const ProductLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const ProductName = styled.p`
  margin: 0.2em auto 0.2em;
  text-align: center;
  max-width: 15em;
  line-height: 1.25;
`;

const Colors = styled.ul`
  list-style: none;
  padding-left: 0;
  padding-right: 0;
  display: flex;
  justify-content: center;
  margin: 0 auto 0.65em;
  max-width: 15em;
`;

const Color = styled.li`
  margin: 0 0.5em;
`;

const ColorButton = styled.button`
  display: block;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  border: 1px solid #bbb;
  border: #e2e2e2 1px solid;
  background-color: ${(props) => props.color};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    bottom: -4px;
    right: -4px;
    border-radius: 50%;
    border: #bbb 1px solid;
  }

  &[data-active="true"] {
    &::after {
      border-color: #222;
    }
  }
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
