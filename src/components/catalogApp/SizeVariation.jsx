/* eslint-disable react/prop-types */
import React from "react";
import { FieldArray, Field, ErrorMessage } from "formik";

import Button from "./Button";

import "../../catalog.css";

const SizeVariation = ({ values }) => {
  return (
    <div className="w-full mb-2">
      <label>Sizes</label>
      <FieldArray name="sizeData">
        {(arrayHelpers) => (
          <>
            {values.sizeData.map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-2 mb-2 lg:grid-cols-3 lg:mb-2"
              >
                <div>
                  <Field
                    name={`sizeData[${index}].name`}
                    placeholder="Name"
                    className="w-full rounded-md bg-slate-300 p-2"
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name={`sizeData[${index}].name`}
                    component={"div"}
                  />
                </div>

                <div>
                  <Field
                    name={`sizeData[${index}].stock`}
                    type="number"
                    placeholder="Stock"
                    className="w-full rounded-md bg-slate-300 p-2"
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name={`sizeData[${index}].stock`}
                    component={"div"}
                  />
                </div>

                <div>
                  <Field
                    name={`sizeData[${index}].price`}
                    type="number"
                    placeholder="Price"
                    className="w-full rounded-md bg-slate-300 p-2"
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name={`sizeData[${index}].price`}
                    component={"div"}
                  />
                </div>

                <hr className="lg:invisible" />
                <hr className="lg:invisible" />
              </div>
            ))}
            <div className="flex justify-between">
              <Button
                className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600 lg:w-1/4"
                type="button"
                onClick={() =>
                  arrayHelpers.push({
                    price: "",
                    stock: "",
                    name: "",
                  })
                }
                label="Add Size"
              />

              <Button
                type="button"
                className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600 lg:w-1/4"
                onClick={() =>
                  values.sizeData.length > 1
                    ? arrayHelpers.remove(values.sizeData.length - 1)
                    : null
                }
                label="Remove Size"
              />
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default SizeVariation;
