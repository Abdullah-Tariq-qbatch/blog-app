import actions from './actions';
import api from '../../utils/blogApp/fetchData';
import sendErrorNotification from '../../utils/blogApp/slackNotification';
import { isSuccess } from '../../utils/blogApp/commonMethods';

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

export const fetchComments = () => async (dispatch) => {
  const comments = JSON.parse(localStorage.getItem('comments'));
  if (comments) {
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

export const createComment = (data) => async (dispatch) => {
  try {
    dispatch(createCommentBegin());
    const response = await api.comments.create(data);
    if (isSuccess(response)) dispatch(createCommentSuccess(response.data));
  } catch (error) {
    sendErrorNotification(error, import.meta.url, 'create comments');
    dispatch(apiError(error.message));
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    dispatch(deleteCommentBegin());
    const response = await api.comments.delete(id);
    if (isSuccess(response)) dispatch(deleteCommentSuccess(response.data));
  } catch (error) {
    sendErrorNotification(error, import.meta.url, 'delete comments');
    dispatch(apiError(error.message));
  }
};

export const clearMessageComments = () => async (dispatch) => {
  dispatch(clearMessageError());
};
