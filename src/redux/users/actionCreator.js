import actions from "./actions";
import api from "../../utils/blogApp/fetchData";
import axios from "axios";
import axiosInstance from "../../utils/userAuthApp/axiosUtils";
import { isSuccess } from "../../utils/blogApp/commonMethods";
import sendErrorNotification from "../../utils/blogApp/slackNotification";

const { fetchUsersBegin, fetchUsersSuccess, apiError, clearMessageError } =
  actions;

export const signUpUser = (body, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.signUpUserBegin());
      const response = await axiosInstance.post("users", body);
      if (actions.isSuccess(response)) {
        dispatch(actions.signUpUserSuccess(response.data));
        navigate("/login");
      }
    } catch (error) {
      dispatch(actions.apiError("Sign up failed!"));
    }
  };
};

export const loginUser = (body, navigate, redirectPath) => {
  return async (dispatch) => {
    try {
      dispatch(actions.loginUserBegin());
      const response = await axiosInstance.post("auth/login", body);
      if (actions.isSuccess(response)) {
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        navigate(redirectPath);
        dispatch(actions.loginUserSuccess(response.data));
      }
    } catch (error) {
      dispatch(actions.apiError("Login failed!"));
    }
  };
};

export const fetchUserData = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchUserDataBegin());
      const response = await axiosInstance.get("auth/profile");
      if (actions.isSuccess(response)) {
        dispatch(actions.fetchUserDataSuccess(response.data));
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout(navigate));
        dispatch(
          actions.apiError("Your session has expired please login again!"),
        );
        return;
      }
      dispatch(actions.apiError("Failed to fetch user data!"));
    }
  };
};

export const fetchGoogleUserData = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchGoogleUserDataBegin());
      const response = await axiosInstance.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
      );
      if (actions.isSuccess(response)) {
        dispatch(actions.fetchGoogleUserDataSuccess(response.data));
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout(navigate));
        dispatch(
          actions.apiError("Your session has expired please login again!"),
        );
        return;
      }
      dispatch(actions.apiError("Failed to fetch google user data!"));
    }
  };
};

export const fetchFacebookUserData = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchFacebookUserDataBegin());

      const params = {
        fields: "name,email,picture",
      };
      const response = await axiosInstance.get(
        "https://graph.facebook.com/me",
        { params },
      );

      if (actions.isSuccess(response)) {
        dispatch(actions.fetchFacebookUserDataSuccess(response.data));
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout(navigate));
        dispatch(
          actions.apiError("Your session has expired please login again!"),
        );
        return;
      }
      dispatch(actions.apiError("Failed to fetch facebook user data!"));
    }
  };
};

export const logout = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(actions.logoutBegin());
      localStorage.clear();
      dispatch(actions.logoutSuccess({}));
      navigate("/login");
    } catch (error) {
      dispatch(actions.apiError("Logout failed!"));
    }
  };
};

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
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
      );
      if (isSuccess(response)) {
        dispatch(actions.fetchUsersSuccessSocialMedia(response.data));
      }
    } catch (err) {
      dispatch(actions.apiError(err));
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
        `https://dummyjson.com/users/search?q=${data}`,
      );
      if (isSuccess(response)) {
        dispatch(actions.searchUserSuccess(response.data.users));
      }
    } catch (err) {
      dispatch(actions.apiError(err));
    }
  };
};

export const deleteAUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(actions.deleteUserBegin());
      dispatch(actions.deleteUserSuccess(userId));
    } catch (err) {
      dispatch(actions.apiError(err));
    }
  };
};

export const reInitializeUsers = () => {
  return async (dispatch) => {
    dispatch(actions.reInitialize());
  };
};
