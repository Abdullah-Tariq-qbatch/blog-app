import React from "react";
import { Field, ErrorMessage } from "formik";

const ProductFormAPI = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-2 w-full lg:grid-cols-2 mb-2">
        <div>
          <Field
            name="price"
            type="number"
            className="w-full rounded-md bg-slate-300 p-2"
          />
          <ErrorMessage
            className="text-red-500"
            name="price"
            component={"div"}
          />
        </div>
        <div>
          <Field
            name="stock"
            type="number"
            className="w-full rounded-md bg-slate-300 p-2"
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
