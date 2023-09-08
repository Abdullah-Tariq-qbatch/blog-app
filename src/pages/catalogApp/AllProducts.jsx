import React, { useEffect } from "react";
import { fetchAllProducts } from "../../redux/products/actionCreator";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { startCase } from "lodash";

import CategorySelector from "../../components/catalogApp/CategorySelector";
import Products from "../../components/catalogApp/Products";
import Search from "../../components/catalogApp/Search";

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
    <div className="mx-10">
      <div className="flex flex-col items-center md:flex-row md:justify-between py-10">
        <Search />
        <div className="mt-5 md:mt-0">
          <CategorySelector category={category} />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 overflow-hidden whitespace-nowrap overflow-ellipsis mb-4">
        {startCase(category)}
      </h1>
      <Products category={category} pageNo={pageNo} searchParam={searchParam} />
    </div>
  );
};

export default AllProducts;
