/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import actions from './actions';
import api from '../../fetchData';
import sendErrorNotification from '../../slackNotification';

const {
  fetchBlogsBegin,
  fetchBlogsSuccess,
  createBlogBegin,
  createBlogSuccess,
  updateBlogBegin,
  updateBlogSuccess,
  deleteBlogBegin,
  deleteBlogSuccess,
  apiError,
} = actions;

const isSuccess = (response) => response.status >= 200 && response.status <= 299;

export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchBlogsBegin());
      const response = await api.blogs.getAll();
      if (isSuccess(response)) dispatch(fetchBlogsSuccess(response.data.data));
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'fetch blogs');
      dispatch(apiError(error.message));
    }
  };
};

export const createBlog = (data) => {
  return async (dispatch) => {
    try {
      dispatch(createBlogBegin());
      const response = await api.blogs.create(data);
      if (isSuccess(response)) dispatch(createBlogSuccess(response.data));
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'create blog');
      dispatch(apiError(error.message));
    }
  };
};

export const updateBlog = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch(updateBlogBegin());
      const response = await api.blogs.update(id, data);
      if (isSuccess(response)) dispatch(updateBlogSuccess(response.data));
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'update blog');
      dispatch(apiError(error.message));
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteBlogBegin());
      const response = await api.blogs.delete(id);
      if (isSuccess(response)) dispatch(deleteBlogSuccess(response.data));
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'delete blog');
      dispatch(apiError(error.message));
    }
  };
};
