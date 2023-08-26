import { combineReducers } from 'redux';

import Blogs from './blogs/reducer';
import Users from './users/reducer';
import Comments from './comments/reducer';

const rootReducer = combineReducers({
  Blogs,
  Users,
  Comments,
});

export default rootReducer;
