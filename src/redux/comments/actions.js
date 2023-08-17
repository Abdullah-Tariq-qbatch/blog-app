const actions = {
  FETCH_COMMENTS_BEGINS: 'FETCH_COMMENTS_BEGINS',
  FETCH_COMMENTS_SUCCESS: 'FETCH_COMMENTS_SUCCESS',

  API_ERROR: 'API_ERROR',

  fetchCommentsBegin: () => ({
    type: actions.FETCH_COMMENTS_BEGINS,
  }),

  fetchCommentsSuccess: (data) => ({
    type: actions.FETCH_COMMENTS_SUCCESS,
    data,
  }),

  apiError: (errorMessage) => ({
    type: actions.API_ERROR,
    err: errorMessage,
  }),
};

export default actions;
