import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

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
          <CategoriesDropDown
            categories={categories}
            selectedCategory={category ?? ""}
          />
          {/* <CategoriesSider
            categories={categories}
            selectedCategory={category ?? ""}
          /> */}
        </LazyLoading>
      </RenderIf>
    </>
  );
};

export default CategorySelector;
