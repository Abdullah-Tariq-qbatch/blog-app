import React from "react";

const ProductSizes = ({ sizes, setSelectedSize }) => {
  return (
    <>
    <label className="text-gray-950 dark:text-gray-200 pr-1 text-sm">Size:</label>
      <select
        className={`px-2 text-sm rounded-sm bg-gray-50 w-auto max-w-full dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-950 h-7 focus:outline-none text-gray-950 dark:text-gray-200`}
        onChange={(e) => {
          setSelectedSize(e.target.value);
        }}
      >
        {sizes.map((size, index) => {
          return (
            <option key={`${index}`} value={index}>
              {size.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default ProductSizes;
