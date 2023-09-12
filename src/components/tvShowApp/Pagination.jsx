import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";

import { toNumber } from "lodash";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Pagination = ({ searchParam, pageParam }) => {
  const navigate = useNavigate();

  const currPage = useSelector((shows) => shows.TvShows.summary.page);
  const totalPages = useSelector((shows) => shows.TvShows.summary.pages);

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
    if (searchParam) {
      navigate(`/tv-shows?search=${searchParam}&page=${pageNum}`);
    } else {
      navigate(`/tv-shows?page=${pageNum}`);
    }
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
          aria-current="page"
          onClick={() => loadContent(i)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
            currPage === i
              ? "border border-gray-300 bg-blue-50 text-blue-custom hover:bg-blue-100 hover:text-blue-custom dark:border-gray-700 dark:bg-blue-900 dark:hover:bg-blue-950 dark:hover:text-blue-700"
              : "border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          } `}
        >
          {i}
        </a>,
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
    <div className="flex items-center justify-between   bg-white px-4 py-6 dark:bg-gray-800 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          onClick={() => loadPrevPageContent()}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          onClick={() => loadNextPageContent()}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <span className="mt-3 text-sm text-gray-700 dark:text-gray-200">
            Page Number :{" "}
            <span className="font-semibold text-blue-custom ">{`${currPage}`}</span>{" "}
            out of{" "}
            <span className="font-semibold text-blue-custom ">{`${totalPages}`}</span>
          </span>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => goToPrevPageRange()}
              className="relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-500  ring-1 ring-inset hover:bg-gray-100 hover:text-gray-700 focus:z-20 focus:outline-offset-0 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <a
              aria-current="page"
              onClick={() => loadContent(1)}
              className={`relative inline-flex items-center border border-gray-300 bg-white px-4 
              py-2 text-sm font-semibold text-gray-500 ring-gray-300 hover:bg-gray-100 hover:text-gray-700 focus:z-20 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
            >
              First
            </a>

            {pageNumber()}

            <a
              aria-current="page"
              onClick={() => loadContent(totalPages)}
              className={`relative inline-flex items-center border border-gray-300 bg-white px-4 
              py-2 text-sm font-semibold text-gray-500 ring-gray-300 hover:bg-gray-100 hover:text-gray-700 focus:z-20 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
            >
              Last
            </a>

            <button
              onClick={() => goToNextPageRange()}
              className="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-500  ring-1 ring-inset hover:bg-gray-100 hover:text-gray-700 focus:z-20 focus:outline-offset-0 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
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
