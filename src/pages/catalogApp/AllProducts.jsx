import React, { useEffect } from "react";
import { fetchAllProducts } from "../../redux/Products/actionCreator";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CategorySelector from "../../components/catalogApp/CategorySelector";
 import Products from "../../components/catalogApp/Products";

const AllProducts = () => {
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search);

  const searchParam = queryParam.get("search");
  const pageNo = queryParam.get("pageNo");
  const category = queryParam.get("category");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        category,
        q: searchParam,
        skip: ((pageNo ?? 1) - 1) * 15,
      })
    );
  }, [pageNo, searchParam, category]);

  return (
    <div className="m-10">
      <ToastContainer />
      <CategorySelector category={category} />
      <Products category={category} pageNo={pageNo} searchParam={searchParam} /> 
    </div>
  );
};

export default AllProducts;
