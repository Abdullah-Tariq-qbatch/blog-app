const actions = {
  FETCH_BLOGS_BEGIN: 'FETCH_BLOGS_BEGIN',
  FETCH_BLOGS_SUCCESS: 'FETCH_BLOGS_SUCCESS',

  API_ERROR: 'API_ERROR',

  fetchBlogsBegin: () => ({
    type: actions.FETCH_BLOGS_BEGIN,
  }),

  fetchBlogsSuccess: (data) => ({
    type: actions.FETCH_BLOGS_SUCCESS,
    data,
  }),

  apiError: (errorMessage) => ({
    type: actions.API_ERROR,
    err: errorMessage,
  }),
};

export default actions;
