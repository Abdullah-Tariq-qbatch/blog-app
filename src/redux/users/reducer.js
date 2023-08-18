/* eslint-disable default-param-last */
import actions from './actions';

const { FETCH_USERS_BEGINS, FETCH_USERS_SUCCESS, API_ERROR } = actions;

const initState = {
  users: [],
  loading: false,
  success: null,
  error: null,
};

const Users = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FETCH_USERS_BEGINS:
      return {
        ...state, loading: true, success: null, error: null,
      };
    case FETCH_USERS_SUCCESS:
      localStorage.setItem('users', JSON.stringify(data));
      return { ...state, users: data, loading: false };
    case API_ERROR:
      return { ...state, loading: false, error: err };
    default:
      return state;
  }
};

export default Users;
