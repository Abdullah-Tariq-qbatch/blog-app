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
          className={`p-2 rounded ${selectedPage === i + 1 ? "active" : ""}`}
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
            ? "bg-gray-200 text-gray-700 cursor-not-allowed"
            : "bg-blueProfessional text-white"
        }`}
      >
        {name}
      </button>
    );
  };

  return (
    <div className="flex justify-end space-x-2 mt-4 mr-4">
      <Button
        onClick={() => handlePageChange(1)}
        disabled={isFirstPage}
        name="First"
      ></Button>

      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        name="Previous"
      ></Button>

      {renderPageNumbers()}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        name="Next"
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
