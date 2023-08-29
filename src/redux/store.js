import { applyMiddleware, compose, createStore } from "redux";

import api from "../utils/blogApp/fetchData";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)))
);

export default store;
