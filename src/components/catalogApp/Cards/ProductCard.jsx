import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { groupBy } from "lodash";
import { EditFilled, DeleteFilled, StarFilled } from "@ant-design/icons";

import DeleteDialog from "../DeleteDialog";
import Colors from "./ColorsToShow";
import ProductSizes from "./ProductSizes";

import RenderIf from "../RenderIf";

import { deleteProduct } from "../../../redux/products/actionCreator";

import "../../../catalog.css";

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const [colors, setColors] = useState(undefined);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setIsDialogVisible(false);
  };

  useEffect(() => {
    product.colors && setColors(groupBy(product.colors, "size"));
  }, [product.colors]);

  return (
    <>
      <div className="max-w-sm bg-white dark:bg-gray-950 border dark:border-gray-950 border-gray-200 rounded-lg shadow flex flex-col">
        <div className="relative z-10">
          <img src={product.thumbnail} className="rounded-t-lg w-96 h-44" />
          <span
            id="blackOverlay"
            className="w-full rounded-t-lg h-full absolute top-0 left-1/2 transform -translate-x-1/2 bg-black opacity-0 dark:opacity-30 flex justify-center items-center"
          />
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-900 rounded-lg px-5 -mt-14 mx-auto w-11/12 mb-5 z-10">
          <div className="flex justify-center h-[50px] items-center">
            <p className="w-[90%] text-base font-bold text-center tracking-tight text-gray-700 dark:text-gray-50 hover:text-pink-custom dark:hover:text-pink-800">
              {product.title}
            </p>
          </div>

          <div className="flex justify-center">
            <p className="text-xs text-gray-400 dark:text-gray-200 flex items-center">
              {product.category}
            </p>
          </div>

          <div className="sm:flex sm:justify-between mt-5">
            <p className="text-gray-600 dark:text-gray-200 text-md md:text-lg">
              Price: $
              {product.sizeData
                ? product.sizeData[selectedSize].price
                : product.price}
            </p>
            <p
              className={`${
                product.sizeData
                  ? product.sizeData[selectedSize].stock !== 0
                    ? "text-green-600"
                    : "text-red-600"
                  : product.stock !== 0
                  ? "text-green-600"
                  : "text-red-600"
              } text-md md:text-lg`}
            >
              {product.sizeData
                ? product.sizeData[selectedSize].stock !== 0
                  ? "In Stock"
                  : "Out of Stock"
                : product.stock !== 0
                ? "In Stock"
                : "Out of Stock"}
            </p>
          </div>

          <div className="flex justify-between mt-2">
            <div className="flex items-center h-6 sm:h-7">
              <RenderIf
                isTrue={product?.sizeData}
                fallback={
                  <p className="text-sm border-0 border-black text-gray-950 dark:text-gray-200 mr-3">
                    Size: <b>N/A</b>
                  </p>
                }
              >
                <ProductSizes
                  sizes={product?.sizeData}
                  setSelectedSize={setSelectedSize}
                />
              </RenderIf>
            </div>
            <div className="flex items-center h-6 sm:h-7">
              <StarFilled className="w-4 h-4 text-yellow-300 mr-1" />
              <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-200">
                {product.rating ? product.rating : "N/A"}
              </span>
            </div>
          </div>

          <div className="h-16">
            <RenderIf isTrue={product.colors && colors}>
              <Colors
                colors={colors}
                sizeData={product.sizeData}
                selectedSize={selectedSize}
              />
            </RenderIf>
          </div>

          <div className="flex justify-between items-end mb-5 pt-2 border-t-[1px] border-black">
            <Link
              to="/catalog/edit"
              state={{ product: product }}
              className="inline-flex items-center p-2 text-lg font-medium text-center text-gray-400 dark:bg-gray-800 bg-gray-50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-[1px] focus:outline-none focus:ring-gray-50"
              type="button"
            >
              <EditFilled className="text-blue-custom" />
            </Link>

            <button
              onClick={() => setIsDialogVisible(true)}
              className="inline-flex items-center p-2 text-lg font-medium text-center text-gray-400 dark:bg-gray-800 bg-gray-50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-[1px] focus:outline-none focus:ring-gray-50"
              type="button"
            >
              <DeleteFilled className="text-red-custom" />
            </button>
          </div>
        </div>

        <div className="z-20">
          <RenderIf isTrue={isDialogVisible}>
            <DeleteDialog
              handleDelete={handleDelete}
              id={product.id}
              setIsDialogVisible={setIsDialogVisible}
            />
          </RenderIf>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
