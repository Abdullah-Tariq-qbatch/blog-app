/* eslint-disable default-param-last */
import actions from './actions';

const { FETCH_COMMENTS_BEGINS, FETCH_COMMENTS_SUCCESS, API_ERROR } = actions;

const initState = {
  comments: [],
  loading: false,
  success: null,
  error: null,
};

const Comments = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FETCH_COMMENTS_BEGINS:
      return {
        ...state, loading: true, success: null, error: null,
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state, comments: data, loading: false,
      };
    case API_ERROR:
      return { ...state, loading: false, error: err };
    default:
      return state;
  }
};

export default Comments;
