import Axios from "axios";
import actions from "./actions";
import { slackNotification } from "../../utils/tvShowApp/utils";

const isResponseSuccessful = (response) => {
  return response.status >= 200 && response.status < 300;
};

// eslint-disable-next-line no-undef
const tvShowsUrl = process.env.REACT_APP_TVSHOWS_URL;

const fetchAllTvShows = (pNum) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchTvShowsBegin());

      const response = await Axios.get(
        `${tvShowsUrl}/most-popular?page=${pNum}`
      );

      if (isResponseSuccessful(response)) {
        dispatch(actions.fetchTvShowsSuccess(response.data));
      }
    } catch (error) {
      dispatch(actions.tvShowsError(error));

      const raw = '{"text": "There\'s error during fetching Tv-Shows"}';
      slackNotification(raw);
    }
  };
};

const addTvShow = (data) => {
  return async (dispatch) => {
    try {
      dispatch(actions.addTvShowBegin());

      dispatch(actions.addTvShowSuccess(data));
    } catch (error) {
      dispatch(actions.tvShowsError(error));

      const raw = '{"text": "There\'s error during adding a Tv-Show"}';
      slackNotification(raw);
    }
  };
};

const removeTvShow = (id) => {
  return async (dispatch) => {
    try {
      dispatch(actions.deleteTvShowBegin());

      dispatch(actions.deleteTvShowSuccess(id));
      slackNotification('{"text": "Tv-Show has deleted successfully"}');
    } catch (error) {
      dispatch(actions.tvShowsError(error));

      const raw = '{"text": "There\'s error during removing a Tv-Show"}';
      slackNotification(raw);
    }
  };
};

const editTvShow = (id, updatedTvShow) => {
  return async (dispatch) => {
    try {
      dispatch(actions.editTvShowBegin());

      dispatch(actions.editTvShowSuccess(id, updatedTvShow));
    } catch (error) {
      dispatch(actions.tvShowsError(error));

      const raw = '{"text": "There\'s error during editing a Tv-Show Details"}';
      slackNotification(raw);
    }
  };
};

const searchTvShowAPI = (searchQuery, pageNum) => {
  return async (dispatch) => {
    try {
      dispatch(actions.searchTvShowsAPIBegin());

      const response = await Axios.get(
        `${tvShowsUrl}/search?q=${searchQuery}&page=${pageNum}`
      );

      dispatch(actions.searchTvShowsAPISuccess(response.data));
    } catch (error) {
      dispatch(actions.tvShowsError(error));
      const raw =
        '{"text": "There\'s error during showing Searching a Tv Show"}';
      slackNotification(raw);
    }
  };
};

const tvShowDetails = (searchQuery) => {
  return async (dispatch) => {
    try {
      dispatch(actions.tvShowDetailsBegin());
      const response = await Axios.get(
        `${tvShowsUrl}/show-details?q=${searchQuery}`
      );

      dispatch(actions.tvShowDetailsSuccess(response.data.tvShow));
    } catch (error) {
      dispatch(actions.tvShowsError(error));

      const raw = '{"text": "There\'s error during showing Tv-Show Details"}';
      slackNotification(raw);
    }
  };
};

const reInit = () => {
  return async (dispatch) => {
    try {
      dispatch(actions.reinitializeSuccess());
    } catch (error) {
      dispatch(actions.tvShowsError(error));
      const raw =
        '{"text": "There\'s error during reinitializing Tv-Show state"}';
      slackNotification(raw);
    }
  };
};

export {
  fetchAllTvShows,
  addTvShow,
  removeTvShow,
  editTvShow,
  searchTvShowAPI,
  tvShowDetails,
  reInit,
};
