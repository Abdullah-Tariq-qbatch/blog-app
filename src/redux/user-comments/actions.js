const actions = {
  FETCH_COMMENTS_BEGIN: "FETCH_COMMENTS_BEGIN",
  FETCH_COMMENTS_SUCCESS: "FETCH_COMMENTS_SUCCESS",
  UPDATE_USER_COMMENTS_BEGIN: "UPDATE_USER_COMMENTS_BEGIN",
  UPDATE_USER_COMMENTS_SUCCESS: "UPDATE_USER_COMMENTS_SUCCESS",
  UPDATE_SINGLE_USER_COMMENTS_BEGIN: "UPDATE_SINGLE_USER_COMMENTS_BEGIN",
  UPDATE_SINGLE_USER_COMMENTS_SUCCESS: "UPDATE_SINGLE_USER_COMMENTS_SUCCESS",
  RE_INITIALIZE: "RE_INITIALIZE",

  API_ERROR: "API_ERROR",

  fetchCommentsBegin: () => {
    return {
      type: actions.FETCH_COMMENTS_BEGIN,
    };
  },

  fetchCommentsSuccess: (data) => {
    return {
      type: actions.FETCH_COMMENTS_SUCCESS,
      data,
    };
  },

  updateUserCommentsBegin: () => {
    return {
      type: actions.UPDATE_USER_COMMENTS_BEGIN,
    };
  },
  updateUserCommentsSuccess: (data) => {
    return {
      type: actions.UPDATE_USER_COMMENTS_SUCCESS,
      data,
    };
  },

  updateSingleUserCommentsBegin: () => {
    return {
      type: actions.UPDATE_SINGLE_USER_COMMENTS_BEGIN,
    };
  },
  updateSingleUserCommentsSuccess: (data) => {
    return {
      type: actions.UPDATE_SINGLE_USER_COMMENTS_SUCCESS,
      data,
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
