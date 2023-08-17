const actions = {
  FETCH_BLOGS_BEGIN: 'FETCH_BLOGS_BEGIN',
  FETCH_BLOGS_SUCCESS: 'FETCH_BLOGS_SUCCESS',

  FETCH_BLOG_BY_ID_BEGIN: 'FETCH_BLOG_BY_ID_BEGIN',
  FETCH_BLOG_BY_ID_SUCCESS: 'FETCH_BLOG_BY_ID_SUCCESS',

  FETCH_BLOG_BY_TAG_BEGIN: 'FETCH_BLOG_BY_TAG_BEGIN',
  FETCH_BLOG_BY_TAG_SUCCESS: 'FETCH_BLOG_BY_TAG_SUCCESS',

  FETCH_BLOG_BY_USER_ID_BEGIN: 'FETCH_BLOG_BY_USER_ID_BEGIN',
  FETCH_BLOG_BY_USER_ID_SUCCESS: 'FETCH_BLOG_BY_USER_ID_SUCCESS',

  CREATE_BLOG_BEGIN: 'CREATE_BLOG_BEGIN',
  CREATE_BLOG_SUCCESS: 'CREATE_BLOG_SUCCESS',

  UPDATE_BLOG_BEGIN: 'UPDATE_BLOG_BEGIN',
  UPDATE_BLOG_SUCCESS: 'UPDATE_BLOG_SUCCESS',

  DELETE_BLOG_BEGIN: 'DELETE_BLOG_BEGIN',
  DELETE_BLOG_SUCCESS: 'DELETE_BLOG_SUCCESS',

  API_ERROR: 'API_ERROR',

  fetchBlogsBegin: () => ({
    type: actions.FETCH_BLOGS_BEGIN,
  }),

  fetchBlogsSuccess: (data) => ({
    type: actions.FETCH_BLOGS_SUCCESS,
    data,
  }),

  fetchBlogByIdBegin: () => ({
    type: actions.FETCH_BLOG_BY_ID_BEGIN,
  }),

  fetchBlogByIdSuccess: (data) => ({
    type: actions.FETCH_BLOG_BY_ID_SUCCESS,
    data,
  }),

  fetchBlogByTagBegin: () => ({
    type: actions.FETCH_BLOG_BY_TAG_BEGIN,
  }),

  fetchBlogByTagSuccess: (data) => ({
    type: actions.FETCH_BLOG_BY_TAG_SUCCESS,
    data,
  }),

  fetchBlogByUserIdBegin: () => ({
    type: actions.FETCH_BLOG_BY_USER_ID_BEGIN,
  }),

  fetchBlogByUserIdSuccess: (data) => ({
    type: actions.FETCH_BLOG_BY_USER_ID_SUCCESS,
    data,
  }),

  createBlogBegin: () => ({
    type: actions.CREATE_BLOG_BEGIN,
  }),

  createBlogSuccess: (data) => ({
    type: actions.CREATE_BLOG_SUCCESS,
    data,
  }),

  updateBlogBegin: () => ({
    type: actions.UPDATE_BLOG_BEGIN,
  }),

  updateBlogSuccess: (data) => ({
    type: actions.UPDATE_BLOG_SUCCESS,
    data,
  }),

  deleteBlogBegin: () => ({
    type: actions.DELETE_BLOG_BEGIN,
  }),

  deleteBlogSuccess: (data) => ({
    type: actions.DELETE_BLOG_SUCCESS,
    data,
  }),

  apiError: (errorMessage) => ({
    type: actions.API_ERROR,
    err: errorMessage,
  }),
};

export default actions;
