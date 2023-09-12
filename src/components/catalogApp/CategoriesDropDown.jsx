import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryDropDown = ({ selectedCategory, categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    category
      ? navigate(`/catalog/?category=${category}`)
      : navigate(`/catalog`);
  };

  return (
    <>
        <select
          className="appearance-none w-full lg:w-60 rounded-md border border-gray-300 py-2 pl-4 pr-10 text-sm font-medium text-gray-700 focus:outline-none bg-transparent dark:bg-gray-800 dark:text-gray-200 
          bg-[linear-gradient(45deg,transparent_50%,gray_50%),linear-gradient(135deg,gray_50%,transparent_50%),linear-gradient(to_right,#ccc,#ccc)] bg-[5px_5px,5px_5px,1px_1.5em] bg-[calc(100%_-_20px)_calc(1em_+_2px),calc(100%_-_15px)_calc(1em_+_2px),calc(100%_-_2.5em)_0.5em] bg-no-repeat"
          value={selectedCategory}
          name="category"
          onChange={(e) => {
            e.target.value === "Select a Category"
              ? handleCategoryClick("")
              : handleCategoryClick(e.target.value);
          }}
        >
          <option>Select a Category</option>
          {categories.map((category, index) => (
            <option key={index} className="w-full rounded-md ">
              {category}
            </option>
          ))}
        </select>
    </>
  );
};

export default CategoryDropDown;
