/* eslint-disable no-unused-vars */
import { cloneDeep } from 'lodash';

import actions from './actions';
import api from '../../utils/blogApp/fetchData';
import sendErrorNotification from '../../utils/blogApp/slackNotification';
import uploadImage from '../../utils/blogApp/imageUpload';
import { isSuccess } from '../../utils/blogApp/commonMethods';

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
  copyLinkSuccess,
} = actions;

export const fetchBlogs = () => async (dispatch) => {
  const blogs = JSON.parse(localStorage.getItem('blogs'));
  if (blogs) {
    dispatch(fetchBlogsSuccess(blogs));
  } else {
    try {
      dispatch(fetchBlogsBegin());
      const response = await api.blogs.getAll();
      if (isSuccess(response)) {
        dispatch(fetchBlogsSuccess(response.data.posts));
        localStorage.setItem('blogs', JSON.stringify(response.data.posts));
      }
    } catch (error) {
      sendErrorNotification(error, import.meta.url, 'fetch blogs');
      dispatch(apiError(error.message));
    }
  }
};

export const createBlog = (data, file) => async (dispatch) => {
  try {
    dispatch(createBlogBegin());
    const imgResponse = await uploadImage.upload(file);
    const response = await api.blogs.create(data);
    const blog = response.data;
    blog.file = imgResponse.data.url;
    if (isSuccess(response)) dispatch(createBlogSuccess(blog));
  } catch (error) {
    sendErrorNotification(error, import.meta.url, 'create blog');
    dispatch(apiError(error.message));
  }
};

export const updateBlog = (id, data, file) => async (dispatch) => {
  try {
    dispatch(updateBlogBegin());
    const response = await api.blogs.update(id, data);
    if (isSuccess(response)) {
      const blog = response.data;
      if (file) {
        const imgResponse = await uploadImage.upload(file);
        blog.file = imgResponse.data.url;
      }
      dispatch(updateBlogSuccess(blog));
    }
  } catch (error) {
    sendErrorNotification(error, import.meta.url, 'update blog');
    dispatch(apiError(error.message));
  }
};

export const likeBlog = (id, data, file) => async (dispatch) => {
  try {
    const response = await api.blogs.update(id, data);
    if (isSuccess(response)) {
      const blog = response.data;
      if (file) {
        blog.file = file;
      }
      dispatch(likeBlogSuccess(blog));
    }
  } catch (error) {
    sendErrorNotification(error, import.meta.url, 'like blog');
    dispatch(apiError(error.message));
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch(deleteBlogBegin());
    const response = await api.blogs.delete(id);
    if (isSuccess(response)) dispatch(deleteBlogSuccess(response.data));
  } catch (error) {
    sendErrorNotification(error, import.meta.url, 'delete blog');
    dispatch(apiError(error.message));
  }
};

export const copyLink = (message) => async (dispatch) => {
  dispatch(copyLinkSuccess(message));
};

export const clearMessage = () => async (dispatch) => {
  dispatch(clearMessageError());
};
