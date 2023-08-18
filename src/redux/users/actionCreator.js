/* eslint-disable arrow-body-style */
import actions from './actions';
import api from '../../fetchData';
import sendErrorNotification from '../../slackNotification';

const { fetchUsersBegin, fetchUsersSuccess, apiError } = actions;

const fetchUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchUsersBegin());
      const response = await api.users.getAll();
      if (response.status >= 200 && response.status <= 299) {
        dispatch(fetchUsersSuccess(response.data.data));
      }
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'fetch users');
      dispatch(apiError(error.message));
    }
  };
};

export default fetchUsers;
