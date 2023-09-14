import { ErrorMessage, Field } from "formik";

import React from "react";

const ProductFormAPI = ({ errors, touched }) => {
  return (
    <>
      <div className="mb-2 grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
        <div
          className={`${errors.price && touched.price ? "animate-pulse" : ""}`}
        >
          <label htmlFor="title" className="mb-2 dark:text-gray-300">
            Price
          </label>
          <Field
            name="price"
            type="number"
            className={`${
              errors.price && touched.price ? "border-2 border-red-500" : ""
            } w-full rounded-md bg-slate-300 p-2`}
          />
          <ErrorMessage
            className="text-red-500"
            name="price"
            component={"div"}
          />
        </div>
        <div
          className={`${errors.price && touched.price ? "animate-pulse" : ""}`}
        >
          <label htmlFor="title" className="mb-2 dark:text-gray-300">
            Stock
          </label>
          <Field
            name="stock"
            type="number"
            className={`${
              errors.price && touched.price ? "border-2 border-red-500" : ""
            } w-full rounded-md bg-slate-300 p-2`}
          />
          <ErrorMessage
            className="text-red-500"
            name="stock"
            component={"div"}
          />
        </div>
      </div>
    </>
  );
};

export default ProductFormAPI;
