import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Pagination({ currentPage, totalPages, handlePageNoClick }) {

  const pagesToShow = 2;
  currentPage = parseInt(currentPage);
  let startPage = Math.max(currentPage - pagesToShow, 1);
  let endPage = Math.min(currentPage + pagesToShow, totalPages);
  const [screenWidth, setScreenWidth] = useState(
    parseInt(window.innerWidth, 10)
  );

  useEffect(() => {
    setScreenWidth(parseInt(window.innerWidth, 10));
  }, [window.innerWidth]);

  if (currentPage <= pagesToShow) {
    endPage = Math.min(startPage + pagesToShow * 2, totalPages);
  } else if (currentPage >= totalPages - pagesToShow) {
    startPage = Math.max(endPage - pagesToShow * 2, 1);
  }

  const paginationLinks = [];
  for (let i = startPage; i <= endPage; i += 1) {
    console.log("start Page", startPage, endPage);
    const isActive = i == currentPage;
    paginationLinks.push(
      <li key={i}>
        <button
          type="button"
          onClick={() => handlePageNoClick(i)}
          className={`flex items-center justify-center px-3 h-8 ${
            isActive
              ? "text-blue-custom bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-950 hover:text-blue-custom dark:hover:text-blue-700 border-gray-300 dark:border-gray-700 border"
              : "dark:text-gray-200 text-gray-500 dark:bg-gray-600 bg-white border dark:border-gray-700 border-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100 dark:hover:text-gray-300 hover:text-gray-700"
          }`}
        >
          {i}
        </button>
      </li>
    );
  }

  return (
    <ul className="inline-flex -space-x-px text-sm">
      <li key="first">
        <button
          type="button"
          onClick={() => handlePageNoClick(1)}
          className="flex items-center justify-center px-1 sm:px-3 h-8 leading-tight rounded-l-lg dark:text-gray-200 text-gray-500 dark:bg-gray-600 bg-white border dark:border-gray-700 border-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100 dark:hover:text-gray-300 hover:text-gray-700"
        >
          {screenWidth <= 640 ? "<<" : "First"}
        </button>
      </li>
      {paginationLinks}
      <li key="last">
        <button
          type="button"
          onClick={() => handlePageNoClick(totalPages)}
          className="flex items-center justify-center px-1 sm:px-3 h-8 leading-tight rounded-r-lg dark:text-gray-200 text-gray-500 dark:bg-gray-600 bg-white border dark:border-gray-700 border-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100 dark:hover:text-gray-300 hover:text-gray-700"
        >
          {screenWidth <= 640 ? ">>" : "Last"}
        </button>
      </li>
    </ul>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};

export default Pagination;
