const actions = {
  FETCH_USERS_BEGINS: 'FETCH_USERS_BEGINS',
  FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',

  API_ERROR: 'API_ERROR',

  CLEAR_MESSAGE_ERROR: 'CLEAR_MESSAGE_ERROR',

  fetchUsersBegin: () => ({
    type: actions.FETCH_USERS_BEGINS,
  }),

  fetchUsersSuccess: (data) => ({
    type: actions.FETCH_USERS_SUCCESS,
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
