/* eslint-disable default-param-last */
import actions from './actions';

const {
  FETCH_COMMENTS_BEGINS,
  FETCH_COMMENTS_SUCCESS,
  CREATE_COMMENT_BEGIN,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_BEGIN,
  DELETE_COMMENT_SUCCESS,
  API_ERROR,
  CLEAR_MESSAGE_ERROR,
} = actions;

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
      localStorage.setItem('comments', JSON.stringify(data));
      return {
        ...state, comments: data, loading: false,
      };
    case CREATE_COMMENT_BEGIN:
      return {
        ...state, loading: true, success: null, error: null,
      };
    case CREATE_COMMENT_SUCCESS:
      localStorage.setItem('comments', JSON.stringify([...state.comments, data]));
      return {
        ...state,
        loading: false,
        success: 'Comment Added',
        comments: [...state.comments, data],
      };
    case DELETE_COMMENT_BEGIN:
      return {
        ...state, loading: true, success: null, error: null,
      };
    case DELETE_COMMENT_SUCCESS:
      localStorage.setItem('comments', JSON.stringify(state.comments.filter((comment) => comment.id !== data.id)));
      return {
        ...state,
        loading: false,
        success: 'Comment Deleted',
        comments: state.comments.filter((comment) => comment.id !== data.id),
      };
    case API_ERROR:
      return { ...state, loading: false, error: err };
    case CLEAR_MESSAGE_ERROR:
      return { ...state, success: null, error: null };
    default:
      return state;
  }
};

export default Comments;
