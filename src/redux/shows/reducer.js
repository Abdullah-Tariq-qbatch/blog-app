import actions from "./actions";
import { toNumber, takeWhile, unionBy } from "lodash";
const initialState = {
  tvShows: [],
  summary: {},
  tvShowDetail: {},
  loading: false,
  success: null,
  error: null,
};
let myTvShowId = 0;
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETECH_TV_SHOWS_BEGIN:
      return { ...state, loading: true, success: null, error: null };

    case actions.FETECH_TV_SHOWS_SUCCESS: {
      const myTvShows = takeWhile(state.tvShows, (tvShow) => tvShow.id < 0);

      return {
        ...state,
        tvShows: unionBy(myTvShows, payload.tv_shows, "id"),
        summary: {
          pages: payload.pages,
          page: payload.page,
          total: payload.total,
        },
        loading: false,
        error: null,
      };
    }

    case actions.ADD_TV_SHOW_BEGIN:
      return { ...state, loading: true, success: null, error: null };

    case actions.ADD_TV_SHOW_SUCCESS: {
      // bad logic
      const newTotal = toNumber(state.summary.total) + 1;
      myTvShowId = myTvShowId - 1;
      payload.id = myTvShowId;
      return {
        ...state,
        tvShows: [payload, ...state.tvShows],
        summary: {
          ...state.summary,
          total: newTotal,
        },
        loading: false,
        success: "Tv Show has added Successfully",
        error: null,
      };
    }

    case actions.EDIT_TV_SHOW_BEGIN:
      return { ...state, loading: true, success: null, error: null };

    case actions.EDIT_TV_SHOW_SUCCESS: {
      const { id, updatedTvShow } = payload;
      const tvShowIndex = state.tvShows.findIndex((tvShow) => tvShow.id === id);
      if (tvShowIndex !== -1) {
        const updatedTvShows = [...state.tvShows];
        updatedTvShows[tvShowIndex] = {
          ...updatedTvShows[tvShowIndex],
          ...updatedTvShow,
        };
        return {
          ...state,
          tvShows: updatedTvShows,
          loading: false,
          success: "TV show has edited Successfully",
          error: null,
        };
      }
      return state;
    }

    case actions.DELETE_TV_SHOW_BEGIN:
      return { ...state, loading: true, success: null, error: null };

    case actions.DELETE_TV_SHOW_SUCCESS: {
      const updatedTvShows = state.tvShows.filter(
        (show) => show.id !== payload
      );

      return {
        ...state,
        tvShows: updatedTvShows,
        loading: false,
        success: "Tv Show has deleted Successfully",
        // success: null,
        error: null,
      };
    }

    case actions.SEARCH_TV_SHOWS_BEGIN:
      return { ...state, loading: true, success: null, error: null };

    case actions.SEARCH_TV_SHOWS_SUCCESS: {
      const filteredTvShows = state.tvShows.filter((show) =>
        show.name.toLowerCase().includes(payload.toLowerCase())
      );

      return {
        ...state,
        tvShows: filteredTvShows,
        loading: false,
        error: null,
      };
    }

    case actions.SEARCH_TV_SHOWS_API_BEGIN:
      return { ...state, loading: true, success: null, error: null };

    case actions.SEARCH_TV_SHOWS_API_SUCCESS:
      return {
        ...state,
        tvShows: payload.tv_shows,
        summary: {
          pages: payload.pages,
          page: payload.page,
          total: payload.total,
        },
        loading: false,
        error: null,
      };

    case actions.TV_SHOW_DETAILS_BEGIN:
      return { ...state, loading: true, success: null, error: null };

    case actions.TV_SHOW_DETAILS_SUCCESS:
      return {
        ...state,
        tvShowDetail: payload,
        loading: false,
        error: null,
      };

    case actions.REINITIALIZE:
      return { ...state, success: null, loading: false, error: null };
    case actions.API_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};
