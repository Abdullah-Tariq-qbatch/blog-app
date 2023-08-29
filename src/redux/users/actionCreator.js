import actions from "./actions";
import api from "../../utils/blogApp/fetchData";
import sendErrorNotification from "../../utils/blogApp/slackNotification";
import { isSuccess } from "../../utils/blogApp/commonMethods";
import axios from "axios";

const { fetchUsersBegin, fetchUsersSuccess, apiError, clearMessageError } =
  actions;

export const fetchUsers = () => async (dispatch) => {
  const users = JSON.parse(localStorage.getItem("users"));
  if (users) {
    dispatch(fetchUsersSuccess(users));
  } else {
    try {
      dispatch(fetchUsersBegin());
      const response = await api.users.getAll();
      if (isSuccess(response)) {
        dispatch(fetchUsersSuccess(response.data.users));
      }
    } catch (error) {
      sendErrorNotification(error, import.meta.url, "fetch users");
      dispatch(apiError(error.message));
    }
  }
};
export const fetchUsersSocialMediaFeed = (limit = 0, skip = 0) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchUsersBegin());
      const response = await axios.get(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );
      if (isSuccess(response)) {
        dispatch(actions.fetchUsersSuccess(response.data));
      }
    } catch (err) {
      dispatch(actions.API_ERROR(err));
    }
  };
};

export const clearMessageUser = () => async (dispatch) => {
  dispatch(clearMessageError());
};

export const searchAllUsers = (data) => {
  return async (dispatch) => {
    try {
      dispatch(actions.searchUserBegin());
      const response = await axios.get(
        `https://dummyjson.com/users/search?q=${data}`
      );
      if (isSuccess(response)) {
        dispatch(actions.searchUserSuccess(response.data.users));
      }
    } catch (err) {
      dispatch(actions.API_ERROR(err));
    }
  };
};

export const deleteAUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(actions.deleteUserBegin());
      dispatch(actions.deleteUserSuccess(userId));
    } catch (err) {
      dispatch(actions.API_ERROR(err));
    }
  };
};

export const reInitializeUsers = () => {
  return async (dispatch) => {
    dispatch(actions.reInitialize());
  };
};
