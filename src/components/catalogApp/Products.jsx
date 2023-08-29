/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import NotFound from "./NotFound";
import LazyLoading from "./LazyLoading";
import { reset } from "../../redux/Products/actionCreator";
import { ceil } from "lodash";
import RenderIf from "./RenderIf";
const ProductCard = React.lazy(() =>
  import(/* webpackChunkName: "ProductCard" */ "./Cards/ProductCard")
);

const Products = ({ category, pageNo, searchParam }) => {
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState();

  const {
    products,
    total,
    error: productError,
    success,
    loading: productLoading,
  } = useSelector((state) => state.Products);

  useMemo(() => {
    setTotalPages(ceil(total / 15));
  }, [total]);

  useEffect(() => {
    productError && toast.error(productError) && dispatch(reset());
  }, [productError]);

  useEffect(() => {
    success && toast.success(success) && dispatch(reset());
  }, [success]);

  return (
    <RenderIf
      isTrue={!productLoading}
      fallback={
        <div className="flex flex-col items-center justify-center h-screen ">
          <Loader />
        </div>
      }
    >
      <RenderIf
        isTrue={products.length !== 0}
        fallback={<NotFound errorMsg={"Data not Found"} />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <LazyLoading key={index}>
              <ProductCard product={product} />
            </LazyLoading>
          ))}
        </div>
      </RenderIf>

      <Pagination
        category={category}
        selectedPage={pageNo - 1}
        searchParam={searchParam}
        key={"page"}
        totalPages={totalPages}
      />
    </RenderIf>
  );
};

export default Products;
