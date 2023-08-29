const actions = {
  FETCH_USERS_BEGINS: "FETCH_USERS_BEGINS",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_SUCCESS_SOCIAL_MEDIA: "FETCH_USERS_SUCCESS_SOCIAL_MEDIA",
  SEARCH_USER_BEGIN: "SEARCH_USER_BEGIN",
  SEARCH_USER_SUCCESS: "SEARCH_USER_SUCCESS",
  DELETE_USER_BEGIN: "DELETE_USER_BEGIN",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  RE_INITIALIZE: "RE_INITIALIZE",

  API_ERROR: "API_ERROR",

  CLEAR_MESSAGE_ERROR: "CLEAR_MESSAGE_ERROR",

  fetchUsersBegin: () => ({
    type: actions.FETCH_USERS_BEGINS,
  }),

  fetchUsersSuccess: (data) => ({
    type: actions.FETCH_USERS_SUCCESS,
    data: {
      users: data,
      total: data.length,
    },
  }),
  fetchUsersSuccessSocialMedia: (data) => {
    return {
      type: actions.FETCH_USERS_SUCCESS_SOCIAL_MEDIA,
      data,
    };
  },
  searchUserBegin: () => {
    return {
      type: actions.SEARCH_USER_BEGIN,
    };
  },

  searchUserSuccess: (data) => {
    return {
      type: actions.SEARCH_USER_SUCCESS,
      data,
    };
  },

  deleteUserBegin: () => {
    return {
      type: actions.DELETE_USER_BEGIN,
    };
  },

  deleteUserSuccess: (userId) => {
    return {
      type: actions.DELETE_USER_SUCCESS,
      data: { userId },
    };
  },

  reInitialize: () => {
    return {
      type: actions.RE_INITIALIZE,
    };
  },

  apiError: (errorMessage) => ({
    type: actions.API_ERROR,
    err: errorMessage,
  }),

  clearMessageError: () => ({
    type: actions.CLEAR_MESSAGE_ERROR,
  }),
};

export default actions;
