const actions = {
  FETCH_BLOGS_BEGIN: 'FETCH_BLOGS_BEGIN',
  FETCH_BLOGS_SUCCESS: 'FETCH_BLOGS_SUCCESS',

  CREATE_BLOG_BEGIN: 'CREATE_BLOG_BEGIN',
  CREATE_BLOG_SUCCESS: 'CREATE_BLOG_SUCCESS',

  UPDATE_BLOG_BEGIN: 'UPDATE_BLOG_BEGIN',
  UPDATE_BLOG_SUCCESS: 'UPDATE_BLOG_SUCCESS',

  DELETE_BLOG_BEGIN: 'DELETE_BLOG_BEGIN',
  DELETE_BLOG_SUCCESS: 'DELETE_BLOG_SUCCESS',

  LIKE_BLOG: 'LIKE_BLOG',
  LINK_COPIED_SUCCESS: 'LINK_COPIED_SUCCESS',

  API_ERROR: 'API_ERROR',

  CLEAR_MESSAGE_ERROR: 'CLEAR_MESSAGE_ERROR',

  fetchBlogsBegin: () => ({
    type: actions.FETCH_BLOGS_BEGIN,
  }),

  fetchBlogsSuccess: (data) => ({
    type: actions.FETCH_BLOGS_SUCCESS,
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

  likeBlogSuccess: (data, message) => ({
    type: actions.LIKE_BLOG,
    data,
    err: message,
  }),

  copyLinkSuccess: (message) => ({
    type: actions.LINK_COPIED_SUCCESS,
    err: message,
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
