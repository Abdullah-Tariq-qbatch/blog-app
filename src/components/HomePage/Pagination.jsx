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
              ? 'text-blue-custom bg-blue-50 hover:bg-blue-100 hover:text-blue-custom border-gray-300 border'
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
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
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
        >
          First
        </button>
      </li>
      {paginationLinks}
      <li key="last">
        <button
          type="button"
          onClick={() => setSearchParams({ page: totalPages })}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
        >
          Last
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
