const initState = {
  products: [],
  productError: null,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS_SUCCESS":
      console.log("action.products: ", action.products);
      return {
        ...state,
        products: action.products,
        productError: null,
      };
    case "SET_PRODUCTS_ERROR":
      console.log("Error setting seller products!");
      return {
        ...state,
        productError: action.err.message,
      };
    case "ADD_PRODUCT_SUCCESS":
      console.log("product added! :D");
      return {
        ...state,
        productError: null,
      };
    case "ADD_PRODUCT_ERROR":
      console.log("error adding product!");
      return {
        ...state,
        productError: action.err.message,
      };
    case "ADD_FAVORITE_SUCCESS":
      console.log("successfully added favorite :D");
      return {
        ...state,
        productError: null,
      };
    case "ADD_FAVORITE_ERROR":
      console.log("error adding favorite!");
      return {
        ...state,
        productError: action.err.message,
      };
    case "REMOVE_FAVORITE_SUCCESS":
      console.log("successfully removed favorite :D");
      return {
        ...state,
        productError: null,
      };
    case "REMOVE_FAVORITE_ERROR":
      console.log("error removing favorite!");
      return {
        ...state,
        productError: action.err.message,
      };
    default:
      return state;
  }
};

export default productReducer;
