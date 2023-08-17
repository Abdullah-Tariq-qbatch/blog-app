/* eslint-disable arrow-body-style */
import actions from './actions';
import api from '../../fetchData';

const { fetchCommentsBegin, fetchCommentsSuccess, apiError } = actions;

const fetchComments = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchCommentsBegin());
      const response = await api.comments.getAll();
      if (response.status >= 200 && response.status <= 299) {
        dispatch(fetchCommentsSuccess(response.data.data));
      }
    } catch (error) {
      dispatch(apiError(error.message));
    }
  };
};

export default fetchComments;
