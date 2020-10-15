function uuidGenerator() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const uploadProductToFirestore = async (
  firestore,
  dispatch,
  sellerId,
  product,
  router
) => {
  const {
    productName,
    category,
    subCategory,
    details,
    description,
    colors,
    price,
  } = product;

  firestore
    .collection("products")
    .doc()
    .set({
      seller_id: sellerId,
      name: productName,
      category,
      sub_category: subCategory,
      details,
      description,
      colors,
      price,
    })
    .then(() => {
      dispatch({ type: "ADD_PRODUCT_SUCCESS" });
      router.push("/products");
    })
    .catch((err) => {
      dispatch({ type: "ADD_PRODUCT_ERROR", err });
    });
};

export const addProduct = (sellerId, product, router) => {
  return (dispatch, getState, { firebase, firestore }) => {
    const { colors } = product;

    const uploadImage = (imagesArray, imageIndex, file) => {
      const uuid = uuidGenerator();
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
              uploadProductToFirestore(
                firestore,
                dispatch,
                sellerId,
                product,
                router
              );
            }
          });
        }
      );
    };

    // const downloadURLs = [];
    (function uploadImages() {
      colors.forEach((color, colorIndex, colorsArray) => {
        const { images } = color;

        images.forEach((image, imageIndex, imagesArray) => {
          const { file } = image;
          uploadImage(imagesArray, imageIndex, file);
        });
      });
    })();
  };
};

export const addToFavorites = (userId, productId) => {
  return (dispatch, getState, { firebase, firestore }) => {
    firestore
      .collection("users")
      .doc(userId)
      .update({
        favorites: firebase.firestore.FieldValue.arrayUnion(productId),
      })
      .then(() => {
        dispatch({ type: "ADD_FAVORITE_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "ADD_FAVORITE_ERROR", err });
      });
  };
};

export const removeFromFavorites = (userId, productId) => {
  return (dispatch, getState, { firebase, firestore }) => {
    firestore
      .collection("users")
      .doc(userId)
      .update({
        favorites: firebase.firestore.FieldValue.arrayRemove(productId),
      })
      .then(() => {
        dispatch({ type: "REMOVE_FAVORITE_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "REMOVE_FAVORITE_ERROR", err });
      });
  };
};
