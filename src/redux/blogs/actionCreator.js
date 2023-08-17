/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import actions from './actions';
import api from '../../fetchData';

const {
  fetchBlogsBegin,
  fetchBlogsSuccess,
  fetchBlogByIdBegin,
  fetchBlogByIdSuccess,
  fetchBlogByTagBegin,
  fetchBlogByTagSuccess,
  fetchBlogByUserIdBegin,
  fetchBlogByUserIdSuccess,
  createBlogBegin,
  createBlogSuccess,
  updateBlogBegin,
  updateBlogSuccess,
  deleteBlogBegin,
  deleteBlogSuccess,
  apiError,
} = actions;

export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchBlogsBegin());
      const response = await api.blogs.getAll();
      if (response.status >= 200 && response.status <= 299) {
        dispatch(fetchBlogsSuccess(response.data.data));
      }
    } catch (error) {
      dispatch(apiError(error.message));
    }
  };
};

export const fetchBlogById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchBlogByIdBegin());
      const response = await api.blogs.getById(id);
      if (response.status >= 200 && response.status <= 299) {
        dispatch(fetchBlogByIdSuccess(response.data.data));
      }
    } catch (error) {
      dispatch(apiError(error.message));
    }
  };
};

export const fetchBlogsByTag = (tagID) => {
  return async (dispatch) => {
    try {
      dispatch(fetchBlogByTagBegin());
      const response = await api.blogs.getByTag(tagID);
      if (response.status >= 200 && response.status <= 299) {
        dispatch(fetchBlogByTagSuccess(response.data.data));
      }
    } catch (error) {
      dispatch(apiError(error.message));
    }
  };
};

export const fetchBlogsByUserId = (userID) => {
  return async (dispatch) => {
    try {
      dispatch(fetchBlogByUserIdBegin());
      const response = await api.blogs.getByUserId(userID);
      if (response.status >= 200 && response.status <= 299) {
        dispatch(fetchBlogByUserIdSuccess(response.data.data));
      }
    } catch (error) {
      dispatch(apiError(error.message));
    }
  };
};
