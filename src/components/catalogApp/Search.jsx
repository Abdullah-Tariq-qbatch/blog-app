import React, { useRef } from "react";
import { debounce } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "../../catalog.css";

const Search = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    searchInputRef.current.value
      ? navigate(`/catalog/?search=${searchInputRef.current.value}`)
      : navigate(`/catalog`);
  };

  const handleChange = debounce(handleSearch, 1000);

  const searchInputRef = useRef();

  return (
    <div className="relative w-44 lg:w-60 ">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchOutlined className="w-4 h-4 text-gray-500" />
      </div>
      <input
        type="search"
        onChange={handleChange}
        id="search"
        ref={searchInputRef}
        // className="block md:w-60 h-11 mt-3 sm:mt-0  mx-10 sm:mr-10 p-4 text-sm outline-none  dark:bg-gray-600 dark:border-gray-700 dark:text-gray-200 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500 dark:focus:ring-pink-800 dark:focus:border-pink-800"
        className="block w-44 lg:w-60  h-11 sm:mt-0 pl-10 text-sm outline-none  dark:bg-gray-600 dark:border-gray-700 dark:text-gray-200 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500 dark:focus:ring-pink-800 dark:focus:border-pink-800"
        placeholder="Search Products"
        required
      />
    </div>
  );
};

export default Search;
