import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { debounce } from "lodash";
import { useRef } from "react";

const SearchBar = () => {
  const searchInputRef = useRef();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  let searchParam = queryParams.get("search");

  useEffect(() => {
    searchInputRef.current.value = searchParam;
  }, [searchParam]);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInputRef.current.value) {
      navigate(`/tv-shows?search=${searchInputRef.current.value}`);
    } else {
      navigate(`/tv-shows`);
    }
  };

  const debouncedHandleSearch = debounce(handleSearch, 900);
  return (
    <div className="flex md:order-2">
      <button
        type="button"
        data-collapse-toggle="navbar-search"
        aria-controls="navbar-search"
        aria-expanded="false"
        className="mr-1 rounded-lg p-2.5 text-sm text-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 md:hidden"
      >
        <span className="sr-only">Search</span>
      </button>

      <div className="relative w-full ">
        <input
          type="search"
          className=" mt-3 block h-11 rounded-lg border-2  border-gray-300 bg-gray-50 p-4  text-sm text-gray-900 outline-none focus:border-pink-500 focus:ring-pink-500 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:focus:border-pink-800 dark:focus:ring-pink-800 sm:mt-6 md:w-60"
          placeholder="Search TV Shows..."
          ref={searchInputRef}
          onChange={(e) => debouncedHandleSearch(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default SearchBar;
