import actions from "./actions";
import axios from "axios";
import { makePosts } from "./api-data";

const fetchPosts = (userId = null) => {
  return async (dispatch) => {
    dispatch(actions.fetchPostsBegin());
    axios
      .all([
        axios.get("https://dummyjson.com/posts", { params: { limit: 0 } }),
        axios.get("https://dummyjson.com/comments", { params: { limit: 0 } }),
        axios.get("https://dummyjson.com/users", { params: { limit: 0 } }),
        axios.get(
          "https://image.dummyjson.com/750x200/008080/ffffff?text=Random+Post!&fontSize=20"
        ),
      ])
      .then(
        axios.spread(
          async (postsData, commentsData, usersData, pictureData) => {
            dispatch(
              actions.fetchPostsSuccess(
                makePosts(
                  postsData,
                  commentsData,
                  usersData,
                  pictureData,
                  userId
                )
              )
            );
          }
        )
      )
      .catch((err) => {
        dispatch(actions.apiError(err));
      });
  };
};

const deleteUserPost = (postId) => {
  return async (dispatch) => {
    try {
      dispatch(actions.deletePostBegin());
      dispatch(actions.deletePostSuccess(postId));
    } catch (err) {
      dispatch(actions.apiError(err));
    }
  };
};

const updateUserPost = (post) => {
  return async (dispatch) => {
    try {
      dispatch(actions.updatePostBegin());
      dispatch(actions.updatePostSuccess(post));
    } catch (err) {
      dispatch(actions.apiError(err));
    }
  };
};

const addUserPost = (post) => {
  return async (dispatch) => {
    try {
      dispatch(actions.addPostBegin());
      dispatch(actions.addPostSuccess(post));
    } catch (err) {
      dispatch(actions.apiError(err));
    }
  };
};

const reInitializePosts = () => {
  return async (dispatch) => {
    dispatch(actions.reInitialize());
  };
};

export {
  fetchPosts,
  deleteUserPost,
  updateUserPost,
  reInitializePosts,
  addUserPost,
};
