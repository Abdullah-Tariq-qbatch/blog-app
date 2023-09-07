import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { startCase } from "lodash";

import Loader from "./Loader";
import RenderIf from "./RenderIf";
import LazyLoading from "./LazyLoading";

import { fetchAllCategory } from "../../redux/categories/actionCreator";

// const CategoriesSider = React.lazy(() =>
//   import(/* webpackChunkName: "CategoriesSider" */ "./CategoriesSider")
// );
const CategoriesDropDown = React.lazy(() =>
  import(/* webpackChunkName: "CategoriesDropDown" */ "./CategoriesDropDown")
);

const CategorySelector = ({ category }) => {
  const dispatch = useDispatch();

  const {
    loading: categoryLoading,
    categories,
    error: categoryError,
  } = useSelector((state) => state.Categories);

  useEffect(() => {
    categoryError && toast.error(categoryError);
  }, [categoryError]);

  useEffect(() => {
    !categories.length && dispatch(fetchAllCategory());
  }, []);

  return (
    <>
      <RenderIf
        isTrue={!categoryLoading}
        fallback={
          <div className="flex flex-col items-center justify-center h-screen ">
            <Loader />
          </div>
        }
      >
        <LazyLoading>
          <div className="pb-10">
            <CategoriesDropDown
              categories={categories}
              selectedCategory={category ?? ""}
            />
            {/* <CategoriesSider
            categories={categories}
            selectedCategory={category ?? ""}
          /> */}
          </div>
        </LazyLoading>

        <h1 className="text-3xl font-bold text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis mb-4">
          {startCase(category)}
        </h1>
      </RenderIf>
    </>
  );
};

export default CategorySelector;
