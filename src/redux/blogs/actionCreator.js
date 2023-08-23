/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import _ from 'lodash';
import actions from './actions';
import api from '../../utils/fetchData';
import sendErrorNotification from '../../utils/slackNotification';
import uploadImage from '../../utils/imageUpload';

const {
  fetchBlogsBegin,
  fetchBlogsSuccess,
  createBlogBegin,
  createBlogSuccess,
  updateBlogBegin,
  updateBlogSuccess,
  deleteBlogBegin,
  deleteBlogSuccess,
  likeBlogSuccess,
  apiError,
  clearMessageError,
} = actions;

const isSuccess = (response) => response.status >= 200 && response.status <= 299;

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = JSON.parse(localStorage.getItem('blogs'));
    if (blogs?.length && blogs) {
      dispatch(fetchBlogsSuccess(blogs));
    } else {
      try {
        dispatch(fetchBlogsBegin());
        const response = await api.blogs.getAll();
        if (isSuccess(response)) dispatch(fetchBlogsSuccess(response.data.posts));
      } catch (error) {
        sendErrorNotification(error, import.meta.url, 'fetch blogs');
        dispatch(apiError(error.message));
      }
    }
  };
};

export const createBlog = (data) => {
  return async (dispatch) => {
    try {
      dispatch(createBlogBegin());
      const response = await api.blogs.create({
        title: data.title, body: data.body, userId: data.userId, reactions: 0,
      });
      const imgResponse = await uploadImage.upload(data.file);
      const blog = response.data;
      blog.file = imgResponse.data.url;
      if (isSuccess(response)) dispatch(createBlogSuccess(blog));
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
      if (data.file) {
        const imgResponse = await uploadImage.upload(data.file);
        delete data.file;
        const response = await api.blogs.update(id, data);
        if (isSuccess(response)) {
          const blog = response.data;
          blog.file = imgResponse.data.url;
          dispatch(updateBlogSuccess(blog));
        }
      } else {
        const response = await api.blogs.update(id, data);
        if (isSuccess(response)) dispatch(updateBlogSuccess(response.data));
      }
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'update blog');
      dispatch(apiError(error.message));
    }
  };
};

export const likeBlog = (id, data) => {
  return async (dispatch) => {
    try {
      if (data.file) {
        const { file } = data;
        delete data.file;
        const response = await api.blogs.update(id, data);
        if (isSuccess(response)) {
          const blog = response.data;
          blog.file = file;
          dispatch(likeBlogSuccess(blog));
        }
      } else {
        const response = await api.blogs.update(id, data);
        if (isSuccess(response)) dispatch(likeBlogSuccess(response.data));
      }
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'like blog');
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

export const clearMessage = () => {
  return async (dispatch) => {
    dispatch(clearMessageError());
  };
};
