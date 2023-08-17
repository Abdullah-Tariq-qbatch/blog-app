/* eslint-disable default-param-last */
import actions from './actions';

const {
  FETCH_BLOGS_BEGIN,
  FETCH_BLOGS_SUCCESS,
  API_ERROR,
} = actions;

const initState = {
  blogs: [],
  loading: false,
  success: null,
  error: null,
};

const Blogs = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FETCH_BLOGS_BEGIN:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case FETCH_BLOGS_SUCCESS:
      return { ...state, blogs: data, loading: false };
    case API_ERROR:
      return { ...state, loading: false, error: err };
    default:
      return state;
  }
};

export default Blogs;
