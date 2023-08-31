/* eslint-disable default-param-last */
import actions from "./actions";
import { produce } from "immer";

const {
  FETCH_USERS_BEGINS,
  FETCH_USERS_SUCCESS,
  API_ERROR,
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCESS,
  SEARCH_USER_BEGIN,
  SEARCH_USER_SUCCESS,
  FETCH_USERS_SUCCESS_SOCIAL_MEDIA,
  RE_INITIALIZE,
  CLEAR_MESSAGE_ERROR,
} = actions;

const initState = {
  users: [],
  currentUser: {},
  total: 0,
  loading: false,
  success: null,
  error: null,
};

const Users = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case actions.SIGN_UP_USER_BEGIN:
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.success = null;
        draftState.error = null;
      });

    case actions.SIGN_UP_USER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.currentUser = data;
        draftState.loading = false;
        draftState.success = "Sign up successful!";
      });

    case actions.LOGIN_USER_BEGIN:
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.success = null;
        draftState.error = null;
      });

    case actions.LOGIN_USER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.currentUser = data;
        draftState.loading = false;
        draftState.success = "Login successful!";
      });

    case actions.FETCH_USER_DATA_BEGIN:
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.success = null;
        draftState.error = null;
      });

    case actions.FETCH_USER_DATA_SUCCESS:
      return produce(state, (draftState) => {
        draftState.currentUser = data;
        draftState.loading = false;
      });

    case actions.FETCH_GOOGLE_USER_DATA_BEGIN:
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.success = null;
        draftState.error = null;
      });

    case actions.FETCH_GOOGLE_USER_DATA_SUCCESS:
      return produce(state, (draftState) => {
        draftState.currentUser = data;
        draftState.loading = false;
      });

    case actions.FETCH_FACEBOOK_USER_DATA_BEGIN:
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.success = null;
        draftState.error = null;
      });

    case actions.FETCH_FACEBOOK_USER_DATA_SUCCESS:
      return produce(state, (draftState) => {
        draftState.currentUser = data;
        draftState.loading = false;
      });

    case actions.LOGOUT_BEGIN:
      return produce(state, (draftState) => {
        draftState.loading = true;
        draftState.success = null;
        draftState.error = null;
      });

    case actions.LOGOUT_SUCCESS:
      return produce(state, (draftState) => {
        draftState.currentUser = data;
        draftState.loading = false;
        draftState.success = "Logout successful";
      });

    case FETCH_USERS_BEGINS:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case FETCH_USERS_SUCCESS_SOCIAL_MEDIA:
      return {
        ...state,
        loading: false,
        users: data.users,
        total: data.total,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      localStorage.setItem("users", JSON.stringify(data.users));
      return {
        ...state,
        loading: false,
        users: data.users,
        total: data.total,
        error: null,
      };

    case API_ERROR:
      return { ...state, loading: false, error: err };
    case CLEAR_MESSAGE_ERROR:
      return { ...state, success: null, error: null };
    case RE_INITIALIZE:
      return {
        ...state,
        success: null,
        loading: false,
        error: null,
      };
    case SEARCH_USER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: data,
        error: null,
      };
    case DELETE_USER_BEGIN:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== data.userId),
        success: "Success: User deleted successfully",
        error: null,
      };

    default:
      return state;
  }
};

export default Users;
