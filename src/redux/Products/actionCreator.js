/* eslint-disable no-undef */
import axios from "axios";
import actions from "./actions";
import slackMessage from "../../utils/catalogApp/slackIntegration";

const productURL = `${process.env.REACT_APP_API_URL}/products`;
const localProducts = 101;
const isSuccess = (status) => status >= 200 && status < 300;

export const fetchAllProducts = (params) => {
  return async (dispatch) => {
    try {
      dispatch(actions.fetchProductsBegin());

      const response = await axios.get(
        `${productURL}/${
          params.category
            ? `category/${params.category}`
            : params.q
            ? `search`
            : ""
        }`,
        {
          params: {
            ...params,
            limit: 15,
          },
        }
      );

      isSuccess(response.status) &&
        dispatch(actions.fetchProductsSuccess(response.data));
    } catch (error) {
      await slackMessage(error);
      dispatch(actions.apiError(error));
    }
  };
};

export const addProduct = (newProduct) => {
  return async (dispatch) => {
    try {
      dispatch(actions.addProductBegin());

      const response = await axios.post(`${productURL}/add`, newProduct);

      isSuccess(response.status) &&
        dispatch(actions.addProductSuccess(newProduct));
    } catch (error) {
      await slackMessage(error);
      dispatch(actions.apiError(error));
    }
  };
};
export const editProduct = (editProduct) => {
  return async (dispatch) => {
    try {
      dispatch(actions.editProductBegin());
      let response;
      editProduct.id < localProducts &&
        (response = await axios.put(
          `${productURL}/${editProduct.id}`,
          editProduct,
          {
            headers: { "content-type": "application/x-www-form-urlencoded" },
          }
        ));

      (editProduct.id >= localProducts || isSuccess(response?.status)) &&
        dispatch(actions.editProductSuccess(editProduct));
    } catch (error) {
      await slackMessage(error);
      dispatch(actions.apiError(error));
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(actions.deleteProductBegin());
      let response;
      productId < localProducts &&
        (response = await axios.delete(`${productURL}/${productId}`));

      (productId >= localProducts || isSuccess(response.status)) &&
        dispatch(actions.deleteProductSuccess(productId));
    } catch (error) {
      await slackMessage(error);
      dispatch(actions.apiError(error));
    }
  };
};

export const reset = () => {
  return async (dispatch) => {
    try {
      dispatch(actions.reset());
    } catch (error) {
      await slackMessage(error);
      dispatch(actions.apiError(error));
    }
  };
};
