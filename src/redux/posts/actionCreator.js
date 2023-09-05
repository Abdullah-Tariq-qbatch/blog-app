/* eslint-disable no-undef */
import actions from "./actions";
import axios from "axios";
import { makePosts } from "./api-data";
import { concat } from "lodash";

const fetchPosts = (userId = null) => {
  return async (dispatch) => {
    dispatch(actions.fetchPostsBegin());
    axios
      .all([
        axios.get(
          concat([process.env.REACT_APP_BACKEND_URL, "/posts"]).join(""),
          {
            params: { limit: 0 },
          }
        ),
        axios.get(
          concat([process.env.REACT_APP_BACKEND_URL, "/comments"]).join(""),
          {
            params: { limit: 0 },
          }
        ),
        axios.get(
          concat([process.env.REACT_APP_BACKEND_URL, "/users"]).join(""),
          {
            params: { limit: 0 },
          }
        ),
      ])
      .then(
        axios.spread(async (postsData, commentsData, usersData) => {
          dispatch(
            actions.fetchPostsSuccess(
              makePosts(postsData, commentsData, usersData, userId)
            )
          );
        })
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
