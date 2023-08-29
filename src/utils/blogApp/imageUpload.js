import axios from 'axios';

const uploadImage = {
  axiosInstance: axios.create({
    baseURL: process.env.REACT_APP_CLOUDINARY_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  }),
  upload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append('timestamp', (Date.now() / 1000) || 0);
    return uploadImage.axiosInstance.post('/image/upload', formData);
  },
};

export default uploadImage;
