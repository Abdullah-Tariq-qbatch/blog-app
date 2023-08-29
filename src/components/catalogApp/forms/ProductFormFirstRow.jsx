import React from "react";
import ProductFormResponsive from "./ProductFormResponsive";
import { Field, ErrorMessage } from "formik";
const ProductFormFirstRow = () => {
  return (
    <ProductFormResponsive
      containers={[
        <>
          <Field
            name={"title"}
            placeholder="Title"
            type={"text"}
            className="w-full rounded-md bg-slate-300 p-2"
          />
          <ErrorMessage
            className="text-red-500"
            name="title"
            component={"div"}
          />
        </>,
        <>
          <Field
            name={"brand"}
            type="brand"
            placeholder={"brand"}
            className="w-full rounded-md bg-slate-300 p-2"
          />
          <ErrorMessage
            className="text-red-500"
            name="brand"
            component={"div"}
          />
        </>,
      ]}
    />
  );
};

export default ProductFormFirstRow;
