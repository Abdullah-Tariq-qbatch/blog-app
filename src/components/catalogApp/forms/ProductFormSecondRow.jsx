import React from "react";
import ProductFormResponsive from "./ProductFormResponsive";
import { Field, ErrorMessage } from "formik";

const ProductFormSecondRow = ({ categories, setFieldValue }) => {
  return (
    <ProductFormResponsive
      containers={[
        <>
          <Field
            name="thumbnail"
            type="file"
            className="mb-2 w-full rounded-md bg-slate-300 p-1 mr-2 h-auto"
            accept="image/*"
            value=""
            onChange={(e) => {
              const file = e.target.files[0];
              file && setFieldValue("thumbnail", URL.createObjectURL(file));
            }}
          />
          <ErrorMessage
            className="text-red-500"
            name="thumbnail"
            component={"div"}
          />
        </>,
        <>
          <Field
            name="category"
            as="select"
            className="border border-gray-300 shadow-sm pr-10 pl-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none bg-[linear-gradient(45deg,transparent_50%,gray_50%),linear-gradient(135deg,gray_50%,transparent_50%),linear-gradient(to_right,#ccc,#ccc)] bg-[calc(100%_-_20px)_calc(1em_+_2px),calc(100%_-_15px)_calc(1em_+_2px),calc(100%_-_2.5em)_0.5em] bg-[5px_5px,5px_5px,1px_1.5em] bg-no-repeat appearance-none mb-2 rounded-md bg-slate-300"
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => {
              return (
                <option
                  className="mb-4 w-full rounded-md bg-slate-300 p-2"
                  value={`${category}`}
                  key={index}
                >
                  {category}
                </option>
              );
            })}
          </Field>
          <ErrorMessage
            className="text-red-500"
            name="category"
            component={"div"}
          />
        </>,
      ]}
    />
  );
};

export default ProductFormSecondRow;
