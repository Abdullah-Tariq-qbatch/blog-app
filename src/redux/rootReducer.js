import { combineReducers } from "redux";


import Blogs from "./blogs/reducer";
import Users from "./users/reducer";
import Comments from "./comments/reducer";
import Products from "./Products/reducer";
import Categories from "./Categories/reducer";

import TvShows from "./shows/reducer";
import UserComments from "./user-comments/reducers";
import Posts from "./posts/reducers";


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
