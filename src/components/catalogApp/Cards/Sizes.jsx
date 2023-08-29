/* eslint-disable react/prop-types */
import React from "react";
import Button from "../Button";

const Sizes = ({ sizes, selectedSize, setSelectedSize }) => {
  return (
    <>
      {sizes.map((size, index) => {
        return (
          <Button
            key={`${index}`}
            className={`px-4 rounded-md hover:bg-gray-300 mr-4 h-7 ${
              selectedSize === index ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setSelectedSize(index);
            }}
            label={size.name}
          />
        );
      })}
    </>
  );
};

export default Sizes;
