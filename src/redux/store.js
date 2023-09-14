/* eslint-disable no-undef */
import { applyMiddleware, compose, createStore } from "redux";

import api from "../utils/blogApp/fetchData";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const composer =
  process.env.NODE_ENV === "production" ? compose : composeWithDevTools;

const store = createStore(
  rootReducer,
  composer(applyMiddleware(thunk.withExtraArgument(api))),
);

export default store;
