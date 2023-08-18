/* eslint-disable default-param-last */
import actions from './actions';

const {
  FETCH_BLOGS_BEGIN,
  FETCH_BLOGS_SUCCESS,
  CREATE_BLOG_BEGIN,
  CREATE_BLOG_SUCCESS,
  UPDATE_BLOG_BEGIN,
  UPDATE_BLOG_SUCCESS,
  DELETE_BLOG_BEGIN,
  DELETE_BLOG_SUCCESS,
  API_ERROR,
} = actions;

const initState = {
  blogs: [],
  loading: false,
  success: null,
  error: null,
};

const Blogs = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FETCH_BLOGS_BEGIN:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case FETCH_BLOGS_SUCCESS:
      localStorage.setItem('blogs', JSON.stringify(data));
      return { ...state, blogs: data, loading: false };
    case CREATE_BLOG_BEGIN:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case CREATE_BLOG_SUCCESS:
      localStorage.setItem('blogs', JSON.stringify([...state.blogs, data]));
      return {
        ...state,
        loading: false,
        success: 'Blog created successfully',
        blogs: [...state.blogs, data],
      };
    case UPDATE_BLOG_BEGIN:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case UPDATE_BLOG_SUCCESS:
      localStorage.setItem('blogs', JSON.stringify(state.blogs.map((blog) => (blog.id === data.id ? data : blog))));
      return {
        ...state,
        loading: false,
        success: 'Blog updated successfully',
        blogs: state.blogs.map((blog) => (blog.id === data.id ? data : blog)),
      };
    case DELETE_BLOG_BEGIN:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case DELETE_BLOG_SUCCESS:
      localStorage.setItem('blogs', JSON.stringify(state.blogs.filter((blog) => blog.id !== data.id)));
      return {
        ...state,
        loading: false,
        success: 'Blog deleted successfully',
        blogs: state.blogs.filter((blog) => blog.id !== data.id),
      };
    case API_ERROR:
      return { ...state, loading: false, error: err };
    default:
      return state;
  }
};

export default Blogs;
