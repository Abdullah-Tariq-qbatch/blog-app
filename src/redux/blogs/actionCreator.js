import { cloneDeep } from 'lodash';

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
  copyLinkSuccess,
} = actions;

const isSuccess = (response) => response.status >= 200 && response.status <= 299;

export const fetchBlogs = () => async (dispatch) => {
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

export const createBlog = (data) => async (dispatch) => {
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

export const updateBlog = (id, data) => async (dispatch) => {
  const tempBlog = cloneDeep(data);
  try {
    dispatch(updateBlogBegin());
    if (tempBlog.file) {
      const imgResponse = await uploadImage.upload(tempBlog.file);
      delete tempBlog.file;
      const response = await api.blogs.update(id, tempBlog);
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

export const likeBlog = (id, data) => {
  const tempBlog = cloneDeep(data);
  return async (dispatch) => {
    try {
      if (tempBlog.file) {
        const { file } = tempBlog;
        delete tempBlog.file;
        const response = await api.blogs.update(id, tempBlog);
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
