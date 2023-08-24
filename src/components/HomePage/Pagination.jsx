/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function Pagination({ currentPage, totalPages, setSearchParams }) {
  const pagesToShow = 2;
  let startPage = Math.max(currentPage - pagesToShow, 1);
  let endPage = Math.min(currentPage + pagesToShow, totalPages);

  if (currentPage <= pagesToShow) {
    endPage = Math.min(startPage + (pagesToShow * 2), totalPages);
  } else if (currentPage >= totalPages - pagesToShow) {
    startPage = Math.max(endPage - (pagesToShow * 2), 1);
  }

  const paginationLinks = [];
  for (let i = startPage; i <= endPage; i++) {
    const isActive = i === currentPage;
    paginationLinks.push(
      <li key={i}>
        <button
          type="button"
          onClick={() => setSearchParams({ page: i })}
          className={`flex items-center justify-center px-3 h-8 ${
            isActive
              ? 'text-blue-custom bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-950 hover:text-blue-custom dark:hover:text-blue-700 border-gray-300 dark:border-gray-700 border'
              : 'dark:text-gray-200 text-gray-500 dark:bg-gray-600 bg-white border dark:border-gray-700 border-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100 dark:hover:text-gray-300 hover:text-gray-700'
          }`}
        >
          {i}
        </button>
      </li>,
    );
  }

  return (
    <ul className="inline-flex -space-x-px text-sm">
      <li key="first">
        <button
          type="button"
          onClick={() => setSearchParams({ page: 1 })}
          className="flex items-center justify-center px-1 sm:px-3 h-8 leading-tight rounded-l-lg dark:text-gray-200 text-gray-500 dark:bg-gray-600 bg-white border dark:border-gray-700 border-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100 dark:hover:text-gray-300 hover:text-gray-700"
        >
          {parseInt(window.innerWidth) <= 640 ? '<<' : 'First'}
        </button>
      </li>
      {paginationLinks}
      <li key="last">
        <button
          type="button"
          onClick={() => setSearchParams({ page: totalPages })}
          className="flex items-center justify-center px-1 sm:px-3 h-8 leading-tight rounded-r-lg dark:text-gray-200 text-gray-500 dark:bg-gray-600 bg-white border dark:border-gray-700 border-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100 dark:hover:text-gray-300 hover:text-gray-700"
        >
          {parseInt(window.innerWidth) <= 640 ? '>>' : 'Last'}
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
