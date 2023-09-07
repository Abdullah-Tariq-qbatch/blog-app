import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
// import { searchIcon } from "../../assets/tvShowApp/svg/icons";
const SearchBar = () => {
  const searchInputRef = useRef();

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
        className="md:hidden text-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1"
      >
        <span className="sr-only">Search</span>
      </button>

      <div className="relative w-full ">
        <input
          type="search"
          className=" block md:w-60 h-11 mt-3 sm:mt-6  p-4 text-sm outline-none  dark:bg-gray-600 dark:border-gray-700 dark:text-gray-200 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500 dark:focus:ring-pink-800 dark:focus:border-pink-800"
          placeholder="Search TV Shows..."
          ref={searchInputRef}
          onChange={(e) => debouncedHandleSearch(e.target.value)}
          required
        />
        <button
          type="submit"
          onClick={() => handleSearch()}
          className="absolute top-0  p-2.5 text-sm font-medium h-full text-black rounded-r-lg   focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          {/* {searchIcon()} */}
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
