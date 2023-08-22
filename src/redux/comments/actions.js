const actions = {
  FETCH_COMMENTS_BEGINS: 'FETCH_COMMENTS_BEGINS',
  FETCH_COMMENTS_SUCCESS: 'FETCH_COMMENTS_SUCCESS',

  CREATE_COMMENT_BEGIN: 'CREATE_COMMENT_BEGIN',
  CREATE_COMMENT_SUCCESS: 'CREATE_COMMENT_SUCCESS',

  DELETE_COMMENT_BEGIN: 'DELETE_COMMENT_BEGIN',
  DELETE_COMMENT_SUCCESS: 'DELETE_COMMENT_SUCCESS',

  API_ERROR: 'API_ERROR',

  CLEAR_MESSAGE_ERROR: 'CLEAR_MESSAGE_ERROR',

  fetchCommentsBegin: () => ({
    type: actions.FETCH_COMMENTS_BEGINS,
  }),

  fetchCommentsSuccess: (data) => ({
    type: actions.FETCH_COMMENTS_SUCCESS,
    data,
  }),

  createCommentBegin: () => ({
    type: actions.CREATE_COMMENT_BEGIN,
  }),

  createCommentSuccess: (data) => ({
    type: actions.CREATE_COMMENT_SUCCESS,
    data,
  }),

  deleteCommentBegin: () => ({
    type: actions.DELETE_COMMENT_BEGIN,
  }),

  deleteCommentSuccess: (data) => ({
    type: actions.DELETE_COMMENT_SUCCESS,
    data,
  }),

  apiError: (errorMessage) => ({
    type: actions.API_ERROR,
    err: errorMessage,
  }),

  clearMessageError: () => ({
    type: actions.CLEAR_MESSAGE_ERROR,
  }),
};

export default actions;
