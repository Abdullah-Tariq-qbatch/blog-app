/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import actions from './actions';
import api from '../../fetchData';
import sendErrorNotification from '../../slackNotification';

const {
  fetchCommentsBegin,
  fetchCommentsSuccess,
  createCommentBegin,
  createCommentSuccess,
  deleteCommentBegin,
  deleteCommentSuccess,
  apiError,
} = actions;

const isSuccess = (response) => response.status >= 200 && response.status <= 299;

export const fetchComments = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchCommentsBegin());
      const response = await api.comments.getAll();
      if (isSuccess(response)) dispatch(fetchCommentsSuccess(response.data.data));
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'fetch comments');
      dispatch(apiError(error.message));
    }
  };
};

export const createComment = (data) => {
  return async (dispatch) => {
    try {
      dispatch(createCommentBegin());
      const response = api.comments.create(data);
      if (isSuccess(response)) dispatch(createCommentSuccess(response.data));
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'create comments');
      dispatch(apiError(error.message));
    }
  };
};

export const deleteComment = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteCommentBegin());
      const response = api.comments.delete(id);
      if (isSuccess(response)) dispatch(deleteCommentSuccess((await response).data));
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'delete comments');
      dispatch(apiError(error.message));
    }
  };
};
