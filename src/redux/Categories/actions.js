const actions = {
  FETCH_CATEGORIES_SUCCESS: "FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_BEGIN: "FETCH_CATEGORIES_BEGIN",

  API_ERROR: "CATEGORY_API_ERROR",

  fetchCategoriesBegin: () => {
    return {
      type: actions.FETCH_CATEGORIES_BEGIN,
    };
  },

  fetchCategoriesSuccess: (payload) => {
    return {
      type: actions.FETCH_CATEGORIES_SUCCESS,
      payload,
    };
  },

  apiError: (error) => {
    return {
      type: actions.API_ERROR,
      payload: { error },
    };
  },
};

export default actions;
