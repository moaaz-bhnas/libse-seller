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
