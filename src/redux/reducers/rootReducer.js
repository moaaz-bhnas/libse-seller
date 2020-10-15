import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import { HYDRATE } from "next-redux-wrapper";

const combinedReducers = combineReducers({
  profile: profileReducer,
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    // if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState;
  }

  return combinedReducers(state, action);
};

export default rootReducer;
