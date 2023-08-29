/* eslint-disable react/prop-types */
import React from "react";
import ColorPicker from "./ColorPicker";
import "../../catalog.css";
import { FieldArray, Field, ErrorMessage } from "formik";
import Button from "./Button";

const ColorVariation = ({ values }) => {
  return (
    <div className="w-full mb-2">
      <label>Colors</label>
      <FieldArray name="colors">
        {(arrayHelpers) => (
          <>
            {values.colors.map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-2 mb-2 lg:grid-cols-2 lg:mb-2"
              >
                <div>
                  <Field
                    name={`colors[${index}].hex`}
                    placeholder="Color"
                    className="w-full rounded-md bg-slate-300 p-2"
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name={`colors[${index}].hex`}
                    component={"div"}
                  />
                </div>

                <div className="flex flex-col">
                  <Field
                    name={`colors[${index}].size`}
                    as="select"
                    className="border border-gray-300 shadow-sm pr-10 pl-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none bg-[linear-gradient(45deg,transparent_50%,gray_50%),linear-gradient(135deg,gray_50%,transparent_50%),linear-gradient(to_right,#ccc,#ccc)] bg-[calc(100%_-_20px)_calc(1em_+_2px),calc(100%_-_15px)_calc(1em_+_2px),calc(100%_-_2.5em)_0.5em] bg-[5px_5px,5px_5px,1px_1.5em] bg-no-repeat appearance-none mb-2 rounded-md bg-slate-300"
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
                <hr className="lg:invisible" />
                <hr className="lg:invisible" />
              </div>
            ))}
            <div className="flex justify-between">
              <Button
                className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600 lg:w-1/4"
                type="button"
                onClick={() => {
                  arrayHelpers.push({ hex: "", size: "" });
                }}
                label="Add Color"
              />
              <Button
                type="button"
                className="w-1/2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600 lg:w-1/4"
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
