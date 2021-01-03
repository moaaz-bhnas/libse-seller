import firebase, { firestore } from "../firebase/clientApp";
import generateUuid from "../utils/generateUuid";

/* ------------------
  products 
--------------------- */
/* get product by id --- */
export const getProduct = async (id) => {
  const product = await firestore.collection("products").doc(id).get();
  return product.data();
};
/* get seller products --- */
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
/* add --- */
const uploadProductToFirestore = async (seller_id, product, callback) => {
  const {
    name,
    category_ar,
    category_en,
    sub_category_ar,
    sub_category_en,
    details,
    description,
    colors,
    price,
  } = product;

  firestore
    .collection("products")
    .doc()
    .set({
      seller_id,
      name,
      category_ar,
      category_en,
      sub_category_ar,
      sub_category_en,
      details,
      description,
      colors,
      price,
    })
    .then(() => {
      callback();
      console.log("product added :D");
    })
    .catch((err) => {
      console.log("product adding error!", err);
    });
};
export const addProduct = ({ seller_id, product, callback }) => {
  const { colors } = product;

  const uploadImage = (imagesArray, imageIndex, file) => {
    const uuid = generateUuid();
    const fileExtenstion = file.name.split(".")[1];
    const storageRef = firebase
      .storage()
      .ref(`products/${uuid}.${fileExtenstion}`);
    const task = storageRef.put(file);
    task.on(
      "state_changed",
      function progress(snapshot) {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
      },
      function error(err) {
        console.log(err);
      },
      function complete() {
        storageRef.getDownloadURL().then((url) => {
          imagesArray[imageIndex] = url;
          const allURLsReady = colors.every((color) => {
            return color.images.every((image) => typeof image === "string");
          });

          if (allURLsReady) {
            uploadProductToFirestore(seller_id, product, callback);
          }
        });
      }
    );
  };
  (function uploadImages() {
    colors.forEach((color) => {
      const { images } = color;

      images.forEach((image, imageIndex, imagesArray) => {
        const { file } = image;
        uploadImage(imagesArray, imageIndex, file);
      });
    });
  })();
};
// add to favorites
export const addToFavorites = (userId, productId) => {
  firestore
    .collection("users")
    .doc(userId)
    .update({
      favorites: firebase.firestore.FieldValue.arrayUnion(productId),
    })
    .then(() => {
      console.log("add-to-favorites success :D");
    })
    .catch((err) => {
      console.log("add-to-favorites error!", err);
    });
};
// remove from favorites
export const removeFromFavorites = (userId, productId) => {
  firestore
    .collection("users")
    .doc(userId)
    .update({
      favorites: firebase.firestore.FieldValue.arrayRemove(productId),
    })
    .then(() => {
      console.log("remove-from-favorites success :D");
    })
    .catch((err) => {
      console.log("remove-from-favorites error!", err);
    });
};

/* ------------------
  profile 
--------------------- */
export const getProfile = async (uid) => {
  const doc = await firestore.collection("users").doc(uid).get();
  const profile = doc.data();
  return profile;
};

/* ------------------
  seller 
--------------------- */
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
