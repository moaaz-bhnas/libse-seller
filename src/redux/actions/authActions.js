export const signUp = (credentials) => {
  return (dispatch, getState, { firebase, firestore }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((response) => {
        return firestore.collection("users").doc(response.user.uid).set({
          username: credentials.username,
          favorites: [],
          isSeller: false,
        });
      })
      .then(() => {
        console.log("username added");
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const logIn = (credentials) => {
  return (dispatch, getState, { firebase }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = ({ callback }) => {
  return (dispatch, getState, { firebase }) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
        callback();
      })
      .catch((err) => {
        dispatch({ type: "SIGNOUT_ERROR", err });
      });
  };
};

export const resetError = () => {
  return { type: "RESET_ERROR" };
};
