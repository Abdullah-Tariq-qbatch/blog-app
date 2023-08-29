import axios from 'axios';

const api = {
  axiosInstance: axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    params: {
      limit: 0,
    },
  }),
  blogs: {
    getAll: async () => api.axiosInstance.get('/posts'),
    create: async (data) => api.axiosInstance.post('/posts/add', data),
    update: async (id, data) => api.axiosInstance.put(`/posts/${id}`, data),
    delete: async (id) => api.axiosInstance.delete(`/posts/${id}`),
  },
  users: {
    getAll: async () => api.axiosInstance.get('/users'),
  },
  comments: {
    getAll: async () => api.axiosInstance.get('/comments'),
    create: async (data) => api.axiosInstance.post('/comments/add', data),
    delete: async (id) => api.axiosInstance.delete(`/comments/${id}`),
  },
};

export default api;
