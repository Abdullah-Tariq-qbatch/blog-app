import "../../catalog.css";

import { ErrorMessage, Field, FieldArray } from "formik";

import Button from "./Button";
import ColorPicker from "./ColorPicker";
import React from "react";

const ColorVariation = ({ values, errors, touched }) => {
  return (
    <div className="m-2 w-full border-t-[1px] border-gray-300 p-2">
      <h1 className="text-center text-xl font-semibold dark:text-gray-300">
        Colors
      </h1>
      <FieldArray name="colors">
        {(arrayHelpers) => (
          <>
            {values.colors.map((_, index) => (
              <div
                key={index}
                className="mb-2 grid grid-cols-1 gap-2 border-b-2 border-gray-300 pb-4 lg:mb-2 lg:grid-cols-2"
              >
                <div
                  className={`${
                    errors?.colors?.length > 0 &&
                    errors?.colors[index]?.hex &&
                    touched?.colors?.length > 0 &&
                    touched?.colors[index]?.hex
                      ? "animate-pulse"
                      : ""
                  }`}
                >
                  <label
                    htmlFor={`colors[${index}].hex`}
                    className="mb-2 dark:text-gray-300"
                  >
                    Color
                  </label>
                  <Field
                    name={`colors[${index}].hex`}
                    placeholder="Enter color"
                    className={`${
                      errors?.colors?.length > 0 &&
                      errors?.colors[index]?.hex &&
                      touched?.colors?.length > 0 &&
                      touched?.colors[index]?.hex
                        ? "border-2 border-red-500"
                        : ""
                    } w-full rounded-md bg-slate-300 p-2 placeholder:text-gray-600`}
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name={`colors[${index}].hex`}
                    component={"div"}
                  />
                </div>

                <div
                  className={`${
                    errors?.colors?.length > 0 &&
                    errors?.colors[index]?.size &&
                    touched?.colors?.length > 0 &&
                    touched?.colors[index]?.size
                      ? "animate-pulse"
                      : ""
                  } flex flex-col`}
                >
                  <label
                    htmlFor={`colors[${index}].size`}
                    className="dark:text-gray-300"
                  >
                    Size
                  </label>
                  <Field
                    name={`colors[${index}].size`}
                    as="select"
                    className="mb-2 appearance-none rounded-md border border-gray-300 bg-slate-300 bg-[linear-gradient(45deg,transparent_50%,gray_50%),linear-gradient(135deg,gray_50%,transparent_50%),linear-gradient(to_right,#ccc,#ccc)] bg-[5px_5px,5px_5px,1px_1.5em] bg-[calc(100%_-_20px)_calc(1em_+_2px),calc(100%_-_15px)_calc(1em_+_2px),calc(100%_-_2.5em)_0.5em] bg-no-repeat py-2 pl-4 pr-10 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                  >
                    <option value="">Select a Size</option>
                    {values.sizeData.map((size, index) => {
                      return (
                        <option
                          className="mb-4 w-full rounded-md bg-slate-300 p-2"
                          value={`${size.name}`}
                          key={index}
                        >
                          {size.name}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    className="text-red-500"
                    name={`colors[${index}].size`}
                    component={"div"}
                  />
                </div>

                <Field name={`colors[${index}].hex`} component={ColorPicker} />
              </div>
            ))}

            {typeof errors?.colors === "string" && (
              <ErrorMessage
                className="text-red-500"
                name={`colors`}
                component={"div"}
              />
            )}
            <div className="flex justify-between space-x-2">
              <Button
                className=" w-1/2 flex-1 rounded-md bg-blue-custom px-4 py-2 text-white hover:bg-blue-800 lg:w-1/4"
                type="button"
                onClick={() => {
                  arrayHelpers.push({ hex: "", size: "" });
                }}
                label="Add Color"
              />
              <Button
                type="button"
                className=" w-1/2 flex-1 rounded-md bg-blue-custom px-4 py-2 text-white hover:bg-blue-800 lg:w-1/4"
                onClick={() =>
                  values.colors.length > 1
                    ? arrayHelpers.remove(values.colors.length - 1)
                    : null
                }
                label="Remove Color"
              />
            </div>
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default ColorVariation;
