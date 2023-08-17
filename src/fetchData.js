/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const api = {
  axiosInstance: axios.create({
    baseURL: 'https://dummyapi.io/data/v1/',
    headers: {
      'app-id': '64de0213af145b50ebc78e35',
    },
  }),
  blogs: {
    getAll: async () => {
      const response = await api.axiosInstance.get('post');
      return response;
    },
    getById: async (id) => {
      const response = await api.axiosInstance.get(`post/${id}`);
      return response;
    },
    getByTag: async (id) => {
      const response = await api.axiosInstance.get(`/tag/${id}/post`);
      return response;
    },
    getByUserId: async (id) => {
      const response = await api.axiosInstance.get(`/user/${id}/post`);
      return response;
    },
    create: async (data) => {
      const response = await api.axiosInstance.post('/post/create', data);
      return response;
    },
    update: async (id, data) => {
      const response = await api.axiosInstance.put(`/post/${id}`, data);
      return response;
    },
    delete: async (id) => {
      const response = await api.axiosInstance.delete(`/post/${id}`);
      return response;
    },
  },
  users: {
    getAll: async () => {
      const response = await api.axiosInstance.get('user');
      return response;
    },
  },
  comments: {
    getAll: async () => {
      const response = await api.axiosInstance.get('comment');
      return response;
    },
  },
};

export default api;
