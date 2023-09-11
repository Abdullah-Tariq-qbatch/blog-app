import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

function Pagination({ currentPage, totalPages, handlePageNoClick }) {
  if (currentPage > totalPages || currentPage < 1) {
    currentPage = 0;
  }

  const pagesToShow = 2;
  let startPage = Math.max(currentPage - pagesToShow, 1);
  let endPage = Math.min(currentPage + pagesToShow, totalPages);

  const [screenWidth, setScreenWidth] = useState(
    parseInt(window.innerWidth, 10),
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
    const isActive = i == currentPage;
    paginationLinks.push(
      <li key={i}>
        <button
          type="button"
          onClick={() => handlePageNoClick(i)}
          className={`flex h-8 items-center justify-center px-3 ${
            isActive
              ? "border border-gray-300 bg-blue-50 text-blue-custom hover:bg-blue-100 hover:text-blue-custom dark:border-gray-700 dark:bg-blue-900 dark:hover:bg-blue-950 dark:hover:text-blue-700"
              : "border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          }`}
        >
          {i}
        </button>
      </li>,
    );
  }

  return (
    <div className="mr-0 mt-5 flex flex-col items-center justify-center pb-10 sm:items-end">
      <nav aria-label="Page navigation example bg-white dark:bg-gray-700">
        <ul className="inline-flex -space-x-px text-sm">
          <li key="first">
            <button
              type="button"
              onClick={() => currentPage > 1 && handlePageNoClick(1)}
              className="flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300 sm:px-3"
            >
              {screenWidth <= 640 ? "<<" : "First"}
            </button>
          </li>
          {paginationLinks}
          <li key="last">
            <button
              type="button"
              onClick={() =>
                currentPage < totalPages && handlePageNoClick(totalPages)
              }
              className="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300 sm:px-3"
            >
              {screenWidth <= 640 ? ">>" : "Last"}
            </button>
          </li>
        </ul>
      </nav>
      <span className="mt-3 text-sm text-gray-700 dark:text-gray-200">
        Page Number :{" "}
        <span className="font-semibold text-blue-custom ">{currentPage}</span>{" "}
        out of{" "}
        <span className="font-semibold text-blue-custom ">{totalPages}</span>
      </span>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageNoClick: PropTypes.func.isRequired,
};

export default Pagination;
