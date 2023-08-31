import Blogs from "./blogs/reducer";
import Categories from "./categories/reducer";
import Comments from "./comments/reducer";
import Posts from "./posts/reducers";
import Products from "./products/reducer";
import TvShows from "./shows/reducer";
import UserComments from "./user-comments/reducers";
import Users from "./users/reducer";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  Blogs,
  Users,
  Comments,
  Products,
  Categories,
  UserComments,
  Posts,
  TvShows,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
