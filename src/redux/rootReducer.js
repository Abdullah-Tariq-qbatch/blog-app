import { combineReducers } from "redux";

import Blogs from "./blogs/reducer";
import Users from "./users/reducer";
import Comments from "./comments/reducer";
import Products from "./Products/reducer";
import Categories from "./Categories/reducer";

const rootReducer = combineReducers({
  Blogs,
  Users,
  Comments,
  Products,
  Categories,
});

export default rootReducer;
