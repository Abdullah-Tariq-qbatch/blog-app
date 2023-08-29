import actions from "./actions";
import { getDataFromLocalStorage } from "./api-data";
import _ from "lodash";

const initialState = {
  posts: [],
  loading: false,
  success: null,
  error: null,
};

const {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  ADD_POST_BEGIN,
  ADD_POST_SUCCESS,
  DELETE_POST_BEGIN,
  DELETE_POST_SUCCESS,
  UPDATE_POST_BEGIN,
  UPDATE_POST_SUCCESS,
  RE_INITIALIZE,
  API_ERROR,
} = actions;

const Posts = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case FETCH_POSTS_BEGIN:
      return { ...state, loading: true };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: data,
        error: null,
      };
    case ADD_POST_BEGIN:
      return { ...state, loading: true, success: null };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: _.concat(state.posts, data.post),
        error: null,
        success: "Success: Post added successfully",
      };
    case UPDATE_POST_BEGIN:
      return { ...state, loading: true };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) => (post.id === data.id ? data : post)),
      };
    case DELETE_POST_BEGIN:
      return { ...state, loading: true };
    case RE_INITIALIZE:
      return {
        ...state,
        success: null,
        loading: false,
        error: null,
      };
    case DELETE_POST_SUCCESS:
      const newPosts = getDataFromLocalStorage("posts").filter(
        (post) => data.postId !== post.id
      );
      localStorage.setItem("posts", JSON.stringify(newPosts));
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== data.postId),
        error: null,
        success: "Success: Post deleted successfully",
      };
    case API_ERROR:
      return {
        ...state,
        error: data,
        success: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default Posts;
