/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { toNumber } from "lodash";

import { useNavigate } from "react-router-dom";

const Pagination = ({ searchParam, pageParam }) => {
  const navigate = useNavigate();

  const currPage = useSelector((shows) => shows.TvShows.summary.page);
  const totalPages = useSelector((shows) => shows.TvShows.summary.pages) - 1;

  const pageRange = 5;

  const [currentPageRange, setCurrentPageRange] = useState({
    start: 1,
    end: Math.min(pageRange, totalPages) || pageRange,
  });

  useEffect(() => {
    const remPage = totalPages - pageRange + 1;

    const newStart =
      Math.min(toNumber(pageParam), remPage < 0 || remPage) ||
      toNumber(pageParam);
    const newEnd =
      Math.min(pageRange + (newStart || 1) - 1, totalPages) ||
      pageRange + (newStart || 1) - 1;
    setCurrentPageRange({ start: newStart, end: newEnd });
  }, [pageParam]);

  const goToNextPageRange = () => {
    if (currentPageRange.end >= totalPages) return;
    const newStart = currentPageRange.start + 1;
    const newEnd = currentPageRange.end + 1;

    if (newEnd <= totalPages) {
      setCurrentPageRange({ start: newStart, end: newEnd });
    } else if (newStart < totalPages) {
      setCurrentPageRange({ start: newStart, end: totalPages });
    }
  };

  const goToPrevPageRange = () => {
    if (currentPageRange.start <= 1) return;
    const newStart = currentPageRange.start - 1;
    const newEnd = currentPageRange.end - 1;

    if (newStart > 0) {
      setCurrentPageRange({ start: newStart, end: newEnd });
    }
  };

  const loadContent = (pageNum) => {
    navigate(`/tv-shows?search=${searchParam}&page=${pageNum}`);
    // restore(null);
  };
  const pageNumber = () => {
    let list = [];

    for (
      let i = currentPageRange.start;
      i <= currentPageRange.end && i <= totalPages;
      i++
    ) {
      list.push(
        <a
          key={i}
          href="#"
          aria-current="page"
          onClick={() => loadContent(i)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
            currPage === i
              ? "z-10  bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          } `}
        >
          {i}
        </a>
      );
    }
    return list;
  };
  const loadNextPageContent = () => {
    if (currPage < totalPages) {
      if (searchParam)
        navigate(`/tv-shows?search=${searchParam}&page=${currPage + 1}`);
      else navigate(`/tv-shows?page=${currPage + 1}`);
      currPage + 1 > currentPageRange.end && goToNextPageRange();
    }
  };
  const loadPrevPageContent = () => {
    if (currPage > 1) {
      if (searchParam)
        navigate(`/tv-shows?search=${searchParam}&page=${currPage - 1}`);
      else navigate(`/tv-shows?page=${currPage - 1}`);
      currPage - 1 < currentPageRange.start && goToPrevPageRange();
    }
  };

  return (
    <div className="flex items-center justify-between   bg-gray-50 px-4 py-6 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          onClick={() => loadPrevPageContent()}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          onClick={() => loadNextPageContent()}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{`${currPage}`}</span> of{" "}
            <span className="font-medium">{`${totalPages}`}</span> totalPages
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => goToPrevPageRange()}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <a
              href="#"
              aria-current="page"
              onClick={() => loadContent(1)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold 
            text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              First
            </a>

            {pageNumber()}

            <a
              href="#"
              aria-current="page"
              onClick={() => loadContent(totalPages)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold 
            text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              Last
            </a>

            <button
              onClick={() => goToNextPageRange()}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
