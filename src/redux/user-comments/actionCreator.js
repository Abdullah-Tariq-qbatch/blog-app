import actions from "./actions";
import axios from "axios";
import { isSuccess } from "../../utils/blogApp/commonMethods";

const fetchAllComments = () => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchCommentsBegin());
      const response = await axios.get("https://dummyjson.com/comments");
      if (isSuccess(response)) {
        dispatch(actions.fetchCommentsSuccess(response.data));
      }
    } catch (err) {
      dispatch(actions.apiError(err));
    }
  };
};

const updateUserComments = (comments) => {
  return async (dispatch) => {
    try {
      await dispatch(actions.updateUserCommentsBegin());
      dispatch(actions.updateUserCommentsSuccess(comments));
    } catch (err) {
      dispatch(actions.apiError(err));
    }
  };
};

const updateSingleUserComments = (comments) => {
  return async (dispatch) => {
    try {
      await dispatch(actions.updateSingleUserCommentsBegin());
      dispatch(actions.updateSingleUserCommentsSuccess(comments));
    } catch (err) {
      dispatch(actions.apiError(err));
    }
  };
};

const reInitializeComments = () => {
  return async (dispatch) => {
    dispatch(actions.reInitialize());
  };
};

export {
  reInitializeComments,
  fetchAllComments,
  updateUserComments,
  updateSingleUserComments,
};
