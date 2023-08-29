const actions = {
  FETCH_POSTS_BEGIN: "FETCH_POSTS_BEGIN",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
  UPDATE_POST_BEGIN: "UPDATE_POST_BEGIN",
  UPDATE_POST_SUCCESS: "UPDATE_POST_SUCCESS",
  ADD_POST_BEGIN: "ADD_POST_BEGIN",
  ADD_POST_SUCCESS: "ADD_POST_SUCCESS",
  DELETE_POST_BEGIN: "DELETE_POST_BEGIN",
  DELETE_POST_SUCCESS: "DELETE_POST_SUCCESS",
  RE_INITIALIZE: "RE_INITIALIZE",
  API_ERROR: "API_ERROR",

  fetchPostsBegin: () => {
    return {
      type: actions.FETCH_POSTS_BEGIN,
    };
  },

  fetchPostsSuccess: (data) => {
    return {
      type: actions.FETCH_POSTS_SUCCESS,
      data,
    };
  },

  updatePostBegin: () => {
    return {
      type: actions.UPDATE_POST_BEGIN,
    };
  },
  updatePostSuccess: (post) => {
    return {
      type: actions.UPDATE_POST_SUCCESS,
      data: post,
    };
  },

  addPostBegin: () => {
    return {
      type: actions.ADD_POST_BEGIN,
    };
  },

  addPostSuccess: (post) => {
    return {
      type: actions.ADD_POST_SUCCESS,
      data: { post },
    };
  },

  deletePostBegin: () => {
    return {
      type: actions.DELETE_POST_BEGIN,
    };
  },

  deletePostSuccess: (postId) => {
    return {
      type: actions.DELETE_POST_SUCCESS,
      data: { postId },
    };
  },

  reInitialize: () => {
    return {
      type: actions.RE_INITIALIZE,
    };
  },

  apiError: (data) => {
    return {
      type: actions.API_ERROR,
      data,
    };
  },
};

export default actions;
