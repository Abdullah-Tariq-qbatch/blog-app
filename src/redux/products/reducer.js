import actions from "./actions";
import _ from "lodash";

const myProducts = 100;
let latestId = 100;
const initialState = {
  products: [],
  loading: true,
  success: null,
  error: null,
  total: 0,
};

export default (state = initialState, { type, payload }) => {
  let newAdded;
  switch (type) {
    case actions.FETCH_PRODUCTS_BEGIN:
      return { ...state, loading: true, success: null, error: null };

    case actions.FETCH_PRODUCTS_SUCCESS:
      newAdded = _.takeWhile(
        state.products,
        (product) => product.id > myProducts
      );
      return {
        ...state,
        loading: false,
        error: null,
        total: payload.total + newAdded.length,
        products: _.unionBy(newAdded, payload.products, "id"),
      };

    case actions.FETCH_PRODUCTS_BY_CATEGORY_BEGIN:
      return { ...state, success: null, loading: true };

    case actions.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
      newAdded = _.takeWhile(
        state.products,
        (product) => product.id > myProducts
      );
      return {
        ...state,
        loading: false,
        error: null,
        total: payload.total + newAdded.length,
        products: _.unionBy(newAdded, payload.products, "id"),
      };

    case actions.SEARCH_PRODUCT_BEGIN:
      return { ...state, success: null, loading: true };

    case actions.SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        total: payload.total,
        products: _.unionBy(
          _.takeWhile(state.products, (product) => product.id > myProducts),
          payload.products,
          "id"
        ),
      };

    case actions.ADD_PRODUCT_BEGIN:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };

    case actions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: "Product Added",
        total: state.total + 1,
        products: [{ ...payload, id: ++latestId }, ...state.products],
      };

    case actions.EDIT_PRODUCT_BEGIN:
      return { ...state, success: null, loading: true };

    case actions.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "Product Edited",
        error: null,
        products: _.map(state.products, (product) =>
          product.id === payload.product.id ? payload.product : product
        ),
      };

    case actions.DELETE_PRODUCT_BEGIN:
      return { ...state, success: null, loading: true };

    case actions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== payload.productId
        ),
        success: "Product Deleted",
        total: state.total - 1,
        loading: false,
        error: null,
      };

    case actions.RESET:
      return {
        ...state,
        loading: false,
        success: null,
      };

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
