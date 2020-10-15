const initState = {
  profileError: null,
  profile: null,
};

const sellerRegistrationReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_PROFILE_SUCCESS":
      console.log("Profile set! :D");
      return {
        ...state,
        profileError: null,
        profile: action.profile,
      };
    case "SET_PROFILE_ERROR":
      console.log("Error setting profile!");
      return {
        ...state,
        profileError: action.err.message,
      };
    default:
      return state;
  }
};

export default sellerRegistrationReducer;
