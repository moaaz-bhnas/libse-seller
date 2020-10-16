import { memo, useContext, useCallback } from "react";
import Product from "./components/Product";
import { Grid } from "./style";
import { AuthContext } from "../../contexts/auth";

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
    )
  );
};

export default memo(ProductsGrid);
