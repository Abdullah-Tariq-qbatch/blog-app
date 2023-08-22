/* eslint-disable arrow-body-style */
import actions from './actions';
import api from '../../fetchData';
import sendErrorNotification from '../../slackNotification';

const {
  fetchUsersBegin, fetchUsersSuccess, apiError, clearMessageError,
} = actions;

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users?.length && users) {
      dispatch(fetchUsersSuccess(users));
    } else {
      try {
        dispatch(fetchUsersBegin());
        const response = await api.users.getAll();
        if (response.status >= 200 && response.status <= 299) {
          dispatch(fetchUsersSuccess(response.data.users));
        }
      } catch (error) {
        sendErrorNotification(error, import.meta.url, 'fetch users');
        dispatch(apiError(error.message));
      }
    }
  };
};

export const clearMessageUser = () => {
  return async (dispatch) => {
    dispatch(clearMessageError());
  };
};
