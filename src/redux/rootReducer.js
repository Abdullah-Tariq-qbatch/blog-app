import { combineReducers } from "redux";

import Blogs from "./blogs/reducer";
import Users from "./users/reducer";
import Comments from "./comments/reducer";
import TvShows from "./shows/reducer";

const rootReducer = combineReducers({
  Blogs,
  Users,
  Comments,
  TvShows,
});

export default rootReducer;
