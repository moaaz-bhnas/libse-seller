export const registerSeller = ({ seller, callback }) => {
  return async (dispatch, getState, { firestore }) => {
    console.log(seller);
    const {
      uid,
      email,
      firstName,
      lastName,
      phoneNumber,
      storeName,
      address,
      openingHour,
      closingHour,
    } = seller;

    try {
      await firestore.collection("sellers").doc(uid).set({
        firstName,
        lastName,
        phoneNumber,
        storeName,
        address,
        openingHour,
        closingHour,
      });

      await firestore
        .collection("users")
        .doc(uid)
        .update({ isSeller: true })
        .then(() => {
          setIsSeller(true);
        });

      dispatch({ type: "SELLER_REGISTRATION_SUCCESS" });
      callback();
    } catch (err) {
      dispatch({ type: "SELLER_REGISTRATION_ERROR", err });
    }
  };
};
