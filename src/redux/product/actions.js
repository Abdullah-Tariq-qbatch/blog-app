const actions = {
  FETCH_PRODUCTS_BEGIN: "FETCH_PRODUCTS_BEGIN",
  FETCH_PRODUCTS_SUCCESS: "FETCH_PRODUCTS_SUCCESS",

  ADD_PRODUCT_BEGIN: "ADD_PRODUCT_BEGIN",
  ADD_PRODUCT_SUCCESS: "ADD_PRODUCT_SUCCESS",

  DELETE_PRODUCT_BEGIN: "DELETE_PRODUCT_BEGIN",
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",

  EDIT_PRODUCT_BEGIN: "EDIT_PRODUCT_BEGIN",
  EDIT_PRODUCT_SUCCESS: "EDIT_PRODUCT_SUCCESS",

  RESET: "RESET",
  API_ERROR: "PRODUCT_API_ERROR",

  fetchProductsBegin: () => {
    return {
      type: actions.FETCH_PRODUCTS_BEGIN,
    };
  },

  fetchProductsSuccess: (payload) => {
    return {
      type: actions.FETCH_PRODUCTS_SUCCESS,
      payload,
    };
  },

  addProductBegin: () => {
    return {
      type: actions.ADD_PRODUCT_BEGIN,
    };
  },

  addProductSuccess: (payload) => {
    return {
      type: actions.ADD_PRODUCT_SUCCESS,
      payload,
    };
  },

  editProductBegin: () => {
    return {
      type: actions.EDIT_PRODUCT_BEGIN,
    };
  },

  editProductSuccess: (product) => {
    return {
      type: actions.EDIT_PRODUCT_SUCCESS,
      payload: { product },
    };
  },

  deleteProductBegin: () => {
    return {
      type: actions.DELETE_PRODUCT_BEGIN,
    };
  },

  deleteProductSuccess: (productId) => {
    return {
      type: actions.DELETE_PRODUCT_SUCCESS,
      payload: { productId },
    };
  },

  apiError: (error) => {
    return {
      type: actions.API_ERROR,
      payload: { error },
    };
  },

  reset: () => {
    return {
      type: actions.RESET,
    };
  },
};

export default actions;
