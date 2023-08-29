/* eslint-disable react/prop-types */
import React from "react";

import "../../catalog.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const CategorySlider = ({ categories, selectedCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    category ? navigate(`/catalog/?category=${category}`) : navigate(`/catalog/`);
  };
  return (
    <div className="flex overflow-x-auto whitespace-nowrap p-4 mt-10">
      <Button
        onClick={() => {
          handleCategoryClick("");
        }}
        className={`px-4 rounded-md shadow-md hover:bg-gray-300 mr-4 h-10 ${
          selectedCategory === "" ? "bg-gray-800 text-white" : "bg-gray-200"
        }`}
        label="All"
      />

      {categories.map((category, index) => (
        <Button
          key={index}
          onClick={() => {
            handleCategoryClick(category);
          }}
          className={`px-4 rounded-md h-10 shadow-md hover:bg-gray-300 mr-4 ${
            selectedCategory === category
              ? "bg-gray-800 text-white"
              : "bg-gray-200"
          }`}
          label={category}
        />
      ))}
    </div>
  );
};

export default CategorySlider;
