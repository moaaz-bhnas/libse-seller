import { memo } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import firebase, { firestore } from "../firebase/clientApp";
import { createWrapper } from "next-redux-wrapper";

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({ firebase, firestore }))
);

const ReactReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

// makeStore function that returns a new store for every request
const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { debug: true });

export default memo(ReactReduxProvider);
