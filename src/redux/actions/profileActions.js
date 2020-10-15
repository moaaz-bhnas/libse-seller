export const setProfile = (sellerId) => {
  return async (dispatch, getState, { firestore }) => {
    try {
      // request data
      const doc = await firestore.collection("users").doc(sellerId).get();
      const profile = doc.data();
      dispatch({ type: "SET_PROFILE_SUCCESS", profile });
    } catch (err) {
      dispatch({ type: "SET_PROFILE_ERROR", err });
    }
  };
};
