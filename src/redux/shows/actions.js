const actions = {
  FETECH_TV_SHOWS_BEGIN: "FETECH_TV_SHOWS_BEGIN",
  FETECH_TV_SHOWS_SUCCESS: "FETECH_TV_SHOWS_SUCCESS",

  EDIT_TV_SHOW_BEGIN: "EDIT_TV_SHOW_BEGIN",
  EDIT_TV_SHOW_SUCCESS: "EDIT_TV_SHOW_SUCCESS",

  ADD_TV_SHOW_BEGIN: "ADD_TV_SHOW_BEGIN",
  ADD_TV_SHOW_SUCCESS: "ADD_TV_SHOW_SUCCESS",

  DELETE_TV_SHOW_BEGIN: "DELETE_TV_SHOW_BEGIN",
  DELETE_TV_SHOW_SUCCESS: "DELETE_TV_SHOW_SUCCESS",

  SEARCH_TV_SHOWS_BEGIN: "SEARCH_TV_SHOWS_BEGIN",
  SEARCH_TV_SHOWS_SUCCESS: "SEARCH_TV_SHOWS_SUCCESS",

  SEARCH_TV_SHOWS_API_BEGIN: "SEARCH_TV_SHOWS_API_BEGIN",
  SEARCH_TV_SHOWS_API_SUCCESS: "SEARCH_TV_SHOWS_API_SUCCESS",

  TV_SHOW_DETAILS_BEGIN: "TV_SHOW_DETAILS_BEGIN",
  TV_SHOW_DETAILS_SUCCESS: "TV_SHOW_DETAILS_SUCCESS",

  SORT_TV_SHOWS_BEGIN: "SORT_TV_SHOWS_BEGIN",
  SORT_TV_SHOWS_SUCCESS: "SORT_TV_SHOWS_SUCCESS",

  REINITIALIZE: "REINITIALIZE",

  API_ERROR: "API_ERROR",

  fetchTvShowsBegin: () => {
    return {
      type: actions.FETECH_TV_SHOWS_BEGIN,
    };
  },
  fetchTvShowsSuccess: (data) => {
    return {
      type: actions.FETECH_TV_SHOWS_SUCCESS,
      payload: data,
    };
  },

  editTvShowBegin: () => {
    return {
      type: actions.EDIT_TV_SHOW_BEGIN,
    };
  },

  editTvShowSuccess: (id, updatedTvShow) => {
    return {
      type: actions.EDIT_TV_SHOW_SUCCESS,
      payload: {
        id,
        updatedTvShow,
      },
    };
  },

  addTvShowBegin: () => {
    return {
      type: actions.ADD_TV_SHOW_BEGIN,
    };
  },

  addTvShowSuccess: (data) => {
    return {
      type: actions.ADD_TV_SHOW_SUCCESS,
      payload: data,
    };
  },

  deleteTvShowBegin: () => {
    return {
      type: actions.DELETE_TV_SHOW_BEGIN,
    };
  },

  deleteTvShowSuccess: (data) => {
    return {
      type: actions.DELETE_TV_SHOW_SUCCESS,
      payload: data,
    };
  },

  searchTvShowsBegin: () => {
    return {
      type: actions.SEARCH_TV_SHOWS_BEGIN,
    };
  },

  searchTvShowsSuccess: (searchQuery) => {
    return {
      type: actions.SEARCH_TV_SHOWS_SUCCESS,
      payload: searchQuery,
    };
  },

  searchTvShowsAPIBegin: () => {
    return {
      type: actions.SEARCH_TV_SHOWS_API_BEGIN,
    };
  },

  searchTvShowsAPISuccess: (queryResult) => {
    return {
      type: actions.SEARCH_TV_SHOWS_API_SUCCESS,
      payload: queryResult,
    };
  },

  tvShowDetailsBegin: () => {
    return {
      type: actions.TV_SHOW_DETAILS_BEGIN,
    };
  },

  tvShowDetailsSuccess: (data) => {
    return {
      type: actions.TV_SHOW_DETAILS_SUCCESS,
      payload: data,
    };
  },

  tvShowsError: (error) => {
    return {
      type: actions.API_ERROR,
      payload: error,
    };
  },

  reinitializeSuccess: () => {
    return {
      type: actions.REINITIALIZE,
    };
  },
};

export default actions;
