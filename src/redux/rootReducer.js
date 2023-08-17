/* eslint-disable import/no-extraneous-dependencies */
// rootReducer.js

import { combineReducers } from 'redux';
import Blogs from './blogs/reducer';

const rootReducer = combineReducers({
  Blogs,
});

export default rootReducer;
