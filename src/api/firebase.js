import firebase from "../firebase/clientApp";

const firestore = firebase.firestore();

export const getSellerProducts = async (sellerId) => {
  // request data
  const snapshot = await firestore
    .collection("products")
    .where("seller_id", "==", sellerId)
    .get();

  // build the array
  const products = [];
  snapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));
  console.log("getSellerProducts - products: ", products);

  return products;
};

export const getProfile = async (uid) => {
  const doc = await firestore.collection("users").doc(uid).get();
  const profile = doc.data();
  return profile;
};
