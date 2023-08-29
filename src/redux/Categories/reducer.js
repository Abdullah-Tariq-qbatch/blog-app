import actions from "./actions";

const initialState = {
  categories: [],
  error: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_CATEGORIES_BEGIN:
      return { ...state, loading: true };

    case actions.FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: payload };

    case actions.API_ERROR:
      return {
        ...state,
        loading: false,
        error: `${payload.error}`,
      };

    default:
      return state;
  }
};
