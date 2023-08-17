import actions from './actions';
import api from '../../fetchData';

const { fetchBlogsBegin, fetchBlogsSuccess, apiError } = actions;

const fetchBlogs = () => async (dispatch) => {
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

export default fetchBlogs;
