import actions from './actions';
import api from '../../utils/fetchData';
import sendErrorNotification from '../../utils/slackNotification';
import { isSuccess } from '../../utils/commonMethods';

const {
  fetchUsersBegin, fetchUsersSuccess, apiError, clearMessageError,
} = actions;

export const fetchUsers = () => async (dispatch) => {
  const users = JSON.parse(localStorage.getItem('users'));
  if (users) {
    dispatch(fetchUsersSuccess(users));
  } else {
    try {
      dispatch(fetchUsersBegin());
      const response = await api.users.getAll();
      if (isSuccess(response)) {
        dispatch(fetchUsersSuccess(response.data.users));
      }
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'fetch users');
      dispatch(apiError(error.message));
    }
  }
};

export const clearMessageUser = () => async (dispatch) => {
  dispatch(clearMessageError());
};
