/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const api = {
  axiosInstance: axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      'app-id': process.env.REACT_APP_BACKEND_API_KEY,
    },
  }),
  blogs: {
    getAll: async () => api.axiosInstance.get('post'),
    create: async (data) => api.axiosInstance.post('post/create', data),
    update: async (id, data) => api.axiosInstance.put(`post/${id}`, data),
    delete: async (id) => api.axiosInstance.delete(`post/${id}`),
  },
  users: {
    getAll: async () => api.axiosInstance.get('user'),
  },
  comments: {
    getAll: async () => api.axiosInstance.get('comment'),
    create: async (data) => api.axiosInstance.post('comment/create', data),
    delete: async (id) => api.axiosInstance.delete(`comment/${id}`),
  },
};

export default api;
