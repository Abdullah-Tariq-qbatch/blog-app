import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "./Loader";
import NotFound from "./NotFound";
import Pagination from "../blogApp/HomePage/Pagination";
import ProductCard from "./Cards/ProductCard";
import RenderIf from "./RenderIf";
import { ceil } from "lodash";
import { reset } from "../../redux/products/actionCreator";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </RenderIf>

      <Pagination
        currentPage={parseInt(pageNo ?? 1)}
        totalPages={totalPages ?? 0}
        handlePageNoClick={handlePageNoClick}
      />
    </RenderIf>
  );
};

export default Products;
