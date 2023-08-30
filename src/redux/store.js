/* eslint-disable no-undef */
import { applyMiddleware, compose, createStore } from "redux";

import api from "../utils/blogApp/fetchData";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composer =
  process.env.NODE_ENV === "production" ? compose : devtools

const store = createStore(
  rootReducer,
  composer(applyMiddleware(thunk.withExtraArgument(api)))
);

export default store;
