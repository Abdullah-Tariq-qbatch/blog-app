import Blogs from "./blogs/reducer";
import Categories from "./categories/reducer";
import Comments from "./comments/reducer";
import Posts from "./posts/reducers";
import Products from "./products/reducer";
import TvShows from "./shows/reducer";
import UserComments from "./user-comments/reducers";
import Users from "./users/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  Blogs,
  Users,
  Comments,
  Products,
  Categories,
  UserComments,
  Posts,
  TvShows,
});

export default rootReducer;
