import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../index.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const [selectedPage, setSelectedPage] = useState(currentPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setSelectedPage(page);
      navigate(`/social-media/users-feed?page=${page}`);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = 5;
    const currentPageIndex = selectedPage - 1;
    const startIndex = Math.max(
      currentPageIndex - Math.floor(totalPagesToShow / 2),
      0
    );
    const endIndex = Math.min(
      startIndex + totalPagesToShow - 1,
      totalPages - 1
    );

    for (let i = startIndex; i <= endIndex; i++) {
      pageNumbers.push(
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={`flex items-center justify-center px-3 h-8 ${
            selectedPage === i + 1
              ? "text-blue-custom bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-950 hover:text-blue-custom dark:hover:text-blue-700 border-gray-300 dark:border-gray-700 border active"
              : "dark:text-gray-200 text-gray-500 dark:bg-gray-600 bg-white border dark:border-gray-700 border-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100 dark:hover:text-gray-300 hover:text-gray-700"
          }`}
        >
          {i + 1}
        </button>
      );
    }
    return pageNumbers;
  };

  const Button = ({ onClick, disabled, name }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`p-2 rounded ${
          disabled
            ? "flex items-center justify-center px-1 sm:px-3 h-8 leading-tight rounded-l-lg dark:text-gray-200 text-gray-500 dark:bg-gray-600 bg-white border dark:border-gray-700 border-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100 dark:hover:text-gray-300  cursor-not-allowed"
            : "flex items-center justify-center px-1 sm:px-3 h-8 leading-tight rounded-l-lg dark:text-gray-200 text-gray-500 dark:bg-gray-600 bg-white border dark:border-gray-700 border-gray-300 dark:hover:bg-gray-800 hover:bg-gray-100 dark:hover:text-gray-300 hover:text-gray-700"
        }`}
      >
        {name}
      </button>
    );
  };

  return (
    <div className="flex justify-end mt-4 mr-4 mb-4">
      <Button
        onClick={() => handlePageChange(1)}
        disabled={isFirstPage}
        name="First"
      ></Button>

      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        name="<<"
      ></Button>

      {renderPageNumbers()}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        name=">>"
      ></Button>

      <Button
        onClick={() => handlePageChange(totalPages)}
        disabled={isLastPage}
        name="Last"
      ></Button>
    </div>
  );
};

export default Pagination;
