import { firestore } from "../firebase/clientApp";

export const getSellerProducts = async (sellerId) => {
  // request data
  const snapshot = await firestore
    .collection("products")
    .where("seller_id", "==", sellerId)
    .get();

  // build the array
  const products = [];
  snapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));
  // console.log("getSellerProducts - products: ", products);

  return products;
};

export const getProfile = async (uid) => {
  const doc = await firestore.collection("users").doc(uid).get();
  const profile = doc.data();
  return profile;
};

export const registerSeller = ({ seller, callback }) => {
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
      return firestore.collection("users").doc(uid).update({ isSeller: true });
    })
    .then(() => {
      callback();
      console.log("register success :D");
    })
    .catch((err) => {
      console.log("register error!", err);
    });
};
