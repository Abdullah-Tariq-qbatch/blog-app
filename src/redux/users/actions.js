const actions = {
  SIGN_UP_USER_BEGIN: "SIGN_UP_USER_BEGIN",
  SIGN_UP_USER_SUCCESS: "SIGN_UP_USER_SUCCESS",

  LOGIN_USER_BEGIN: "LOGIN_USER_BEGIN",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",

  FETCH_USER_DATA_BEGIN: "FETCH_USER_DATA_BEGIN",
  FETCH_USER_DATA_SUCCESS: "FETCH_USER_DATA_SUCCESS",

  FETCH_GOOGLE_USER_DATA_BEGIN: "FETCH_GOOGLE_USER_DATA_BEGIN",
  FETCH_GOOGLE_USER_DATA_SUCCESS: "FETCH_GOOGLE_USER_DATA_SUCCESS",

  FETCH_FACEBOOK_USER_DATA_BEGIN: "FETCH_FACEBOOK_USER_DATA_BEGIN",
  FETCH_FACEBOOK_USER_DATA_SUCCESS: "FETCH_FACEBOOK_USER_DATA_SUCCESS",

  LOGOUT_BEGIN: "LOGOUT_BEGIN",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",

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

  signUpUserBegin: () => {
    return {
      type: actions.SIGN_UP_USER_BEGIN,
    };
  },

  signUpUserSuccess: (data) => {
    return {
      type: actions.SIGN_UP_USER_SUCCESS,
      data: data,
    };
  },

  loginUserBegin: () => {
    return {
      type: actions.LOGIN_USER_BEGIN,
    };
  },

  loginUserSuccess: (data) => {
    return {
      type: actions.LOGIN_USER_SUCCESS,
      data: data,
    };
  },

  fetchUserDataBegin: () => {
    return {
      type: actions.FETCH_USER_DATA_BEGIN,
    };
  },

  fetchUserDataSuccess: (data) => {
    return {
      type: actions.FETCH_USER_DATA_SUCCESS,
      data: data,
    };
  },

  fetchGoogleUserDataBegin: () => {
    return {
      type: actions.FETCH_GOOGLE_USER_DATA_BEGIN,
    };
  },

  fetchGoogleUserDataSuccess: (data) => {
    return {
      type: actions.FETCH_GOOGLE_USER_DATA_SUCCESS,
      data: data,
    };
  },

  fetchFacebookUserDataBegin: () => {
    return {
      type: actions.FETCH_FACEBOOK_USER_DATA_BEGIN,
    };
  },

  fetchFacebookUserDataSuccess: (data) => {
    return {
      type: actions.FETCH_FACEBOOK_USER_DATA_SUCCESS,
      data: data,
    };
  },

  logoutBegin: () => {
    return {
      type: actions.LOGOUT_BEGIN,
    };
  },

  logoutSuccess: (data) => {
    return {
      type: actions.LOGOUT_SUCCESS,
      data: data,
    };
  },

  isSuccess: (response) => {
    return response.status >= 200 && response.status < 300;
  },

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
