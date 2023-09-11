import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";

import CategorySelector from "../../components/catalogApp/CategorySelector";
import Products from "../../components/catalogApp/Products";
import Search from "../../components/catalogApp/Search";
import { fetchAllProducts } from "../../redux/products/actionCreator";
import { startCase } from "lodash";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const AllProducts = () => {
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search);

  const searchParam = queryParam.get("search");
  const pageNo = queryParam.get("pageNo") ?? 1;
  const category = queryParam.get("category");

  const dispatch = useDispatch();

  useEffect(() => {
    if (pageNo > 0) {
      dispatch(
        fetchAllProducts({
          category,
          q: searchParam,
          skip: (pageNo - 1) * 15,
        }),
      );
    }
  }, [pageNo, searchParam, category]);

  return (
    <div className="mx-10">
      <div className="flex flex-col items-center py-10 md:flex-row md:justify-between">
        <Search />
        <div className="mt-5 md:mt-0">
          <CategorySelector category={category} />
        </div>
      </div>

      <h1 className="mb-4 overflow-hidden overflow-ellipsis whitespace-nowrap text-3xl font-bold text-gray-900 dark:text-gray-200">
        {startCase(category)}
      </h1>
      <Products category={category} pageNo={pageNo} searchParam={searchParam} />
    </div>
  );
};

export default AllProducts;
