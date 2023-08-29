import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { searchIcon } from "../../assets/tvShowApp/svg/icons";
const SearchBar = () => {
  const searchInputRef = useRef();

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInputRef.current.value) {
      navigate(`/tvShows?search=${searchInputRef.current.value}`);
    } else {
      navigate(`/tvShows`);
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

      <div className="relative w-full sm: px-12">
        <input
          type="search"
          className=" p-2.5  w-full  text-sm text-gray-900 bg-white rounded-lg  border border-gray-300  focus:border-blue-500 "
          placeholder="Search..."
          ref={searchInputRef}
          onChange={(e) => debouncedHandleSearch(e.target.value)}
          required
        />
        <button
          type="submit"
          onClick={() => handleSearch()}
          className="absolute top-0  p-2.5 text-sm font-medium h-full text-black rounded-r-lg   focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          {searchIcon()}
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
