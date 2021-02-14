import { memo, useContext, useCallback } from "react";
import Product from "./components/Product";
import { AuthContext } from "../../contexts/auth";
import styled from "styled-components";
import { ProfileContext } from "../../contexts/profile";
import { title } from "../Title/style";
import useTranslation from "../../hooks/useTranslation";
import strings from "../../translations/strings/productsPage";

const ProductsGrid = ({ products, seller }) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const {
    profile: { favorites },
  } = useContext(ProfileContext);

  const checkFavorite = useCallback(
    (productId) => {
      return (
        favorites &&
        favorites.some((favoriteProductId) => favoriteProductId === productId)
      );
    },
    [favorites]
  );

  return (
    <>
      <Title>{t(strings, "myProducts")}</Title>
      {user && (
        <Grid>
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              seller={seller}
              inFavorites={checkFavorite(product.id)}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

const Title = styled.h2`
  ${title}
`;

const Grid = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
  padding-right: 0;
  margin: 0 -1em;
  flex-wrap: wrap;

  .productsGrid__imageSlider {
    margin-bottom: 0.8em;
  }
`;

export default memo(ProductsGrid);
