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
  },
};

export default api;
