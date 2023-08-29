import { combineReducers } from "redux";

import Blogs from "./blogs/reducer";
import Users from "./users/reducer";
import Comments from "./comments/reducer";
import UserComments from "./user-comments/reducers";
import Posts from "./posts/reducers";
const rootReducer = combineReducers({
  Blogs,
  Users,
  Comments,
  UserComments,
  Posts,
});

export default rootReducer;
