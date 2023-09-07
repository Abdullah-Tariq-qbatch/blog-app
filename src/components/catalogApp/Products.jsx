import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ceil } from "lodash";
import { useNavigate } from "react-router-dom";

import Pagination from "../blogApp/HomePage/Pagination";
import LazyLoading from "./LazyLoading";
import NotFound from "./NotFound";
import Loader from "./Loader";
import RenderIf from "./RenderIf";

import { reset } from "../../redux/products/actionCreator";

const ProductCard = React.lazy(() =>
  import(/* webpackChunkName: "ProductCard" */ "./Cards/ProductCard")
);

const Products = ({ category, pageNo, searchParam }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState();

  const {
    products,
    total,
    error: productError,
    success,
    loading: productLoading,
  } = useSelector((state) => state.Products);

  useMemo(() => {
    setTotalPages(ceil(total / 16));
  }, [total]);

  useEffect(() => {
    productError && toast.error(productError) && dispatch(reset());
  }, [productError]);

  useEffect(() => {
    success && toast.success(success) && dispatch(reset());
  }, [success]);

  const handlePageNoClick = (currentPage) => {
    if (!searchParam && !category) navigate(`/catalog/?pageNo=${currentPage}`);
    else if (category) {
      navigate(`/catalog/?pageNo=${currentPage}&category=${category}`);
    } else {
      navigate(`/catalog/?pageNo=${currentPage}&search=${searchParam}`);
    }
  };

  return (
    <RenderIf
      isTrue={!productLoading}
      fallback={
        <div className="flex flex-col items-center justify-between">
          <Loader />
        </div>
      }
    >
      <RenderIf
        isTrue={products.length !== 0}
        fallback={<NotFound errorMsg={"Data not Found"} />}
      >
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
            {products.map((product, index) => (
              <LazyLoading key={index}>
                <ProductCard product={product} />
              </LazyLoading>
            ))}
          </div>
        </div>
      </RenderIf>
      <Pagination
        currentPage={pageNo ?? 1}
        totalPages={totalPages ?? 0}
        handlePageNoClick={handlePageNoClick}
      />
    </RenderIf>
  );
};

export default Products;
