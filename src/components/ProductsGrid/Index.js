import { memo, useContext, useCallback } from "react";
import Product from "./components/Product";
import { AuthContext } from "../../contexts/auth";
import styled from "styled-components";

const ProductsGrid = ({ products, seller }) => {
  const { user } = useContext(AuthContext);
  // const { favorites } = useSelector((state) => state.firebase.profile);
  const favorites = [];

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
    user && (
      <Container>
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
      </Container>
    )
  );
};

const Container = styled.div`
  padding: 0 1em;
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
