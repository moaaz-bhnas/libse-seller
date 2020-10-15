const initState = {
  registrationError: null,
};

const sellerRegistrationReducer = (state = initState, action) => {
  switch (action.type) {
    case "SELLER_REGISTRATION_ERROR":
      console.log("seller registeration error");
      return {
        ...state,
        registrationError: action.err.message,
      };
    case "SELLER_REGISTRATION_SUCCESS":
      console.log("seller registered");
      return {
        ...state,
        registrationError: null,
      };
    default:
      return state;
  }
};

export default sellerRegistrationReducer;
