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

    firestore
      .collection("sellers")
      .doc(uid)
      .set({
        firstName,
        lastName,
        phoneNumber,
        storeName,
        address,
        openingHour,
        closingHour,
      })
      .then(() => {
        return firestore
          .collection("users")
          .doc(uid)
          .update({ isSeller: true });
      })
      .then(() => {
        dispatch({ type: "SELLER_REGISTRATION_SUCCESS" });
        callback();
      })
      .catch((err) => {
        dispatch({ type: "SELLER_REGISTRATION_ERROR", err });
      });

    // try {
    //   console.log("try");
    //   await firestore.collection("sellers").doc(uid).set({
    //     firstName,
    //     lastName,
    //     phoneNumber,
    //     storeName,
    //     address,
    //     openingHour,
    //     closingHour,
    //   });
    //   console.log(1);

    //   await firestore
    //     .collection("users")
    //     .doc(uid)
    //     .update({ isSeller: true })
    //     .then(() => {
    //       setIsSeller(true);
    //     });
    //   console.log(2);

    //   dispatch({ type: "SELLER_REGISTRATION_SUCCESS" });
    //   callback();
    // } catch (err) {
    //   dispatch({ type: "SELLER_REGISTRATION_ERROR", err });
    // }
  };
};
