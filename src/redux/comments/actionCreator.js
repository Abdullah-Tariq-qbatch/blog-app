/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import actions from './actions';
import api from '../../utils/fetchData';
import sendErrorNotification from '../../utils/slackNotification';

const {
  fetchCommentsBegin,
  fetchCommentsSuccess,
  createCommentBegin,
  createCommentSuccess,
  deleteCommentBegin,
  deleteCommentSuccess,
  apiError,
  clearMessageError,
} = actions;

const isSuccess = (response) => response.status >= 200 && response.status <= 299;

export const fetchComments = () => {
  return async (dispatch) => {
    const comments = JSON.parse(localStorage.getItem('comments'));
    if (comments?.length && comments) {
      dispatch(fetchCommentsSuccess(comments));
    } else {
      try {
        dispatch(fetchCommentsBegin());
        const response = await api.comments.getAll();

        if (isSuccess(response)) dispatch(fetchCommentsSuccess(response.data.comments));
      } catch (error) {
        sendErrorNotification(error, import.meta.url, 'fetch comments');
        dispatch(apiError(error.message));
      }
    }
  };
};

export const createComment = (data) => {
  return async (dispatch) => {
    try {
      dispatch(createCommentBegin());
      const response = await api.comments.create(data);
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
      const response = await api.comments.delete(id);
      if (isSuccess(response)) dispatch(deleteCommentSuccess(response.data));
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'delete comments');
      dispatch(apiError(error.message));
    }
  };
};

export const clearMessageComments = () => {
  return async (dispatch) => {
    dispatch(clearMessageError());
  };
};
