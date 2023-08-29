/* eslint-disable react/prop-types */
import React from "react";

const TvShowPerformanceDetail = ({ tvShowDetail }) => {
  return (
    <div className="flex justify-center  px-6 flex-col md:px-12 lg:px-30 lg:flex-row lg:space-x-48">
      <div>
        <h1 className="mb-4 text-2xl dark:text-gray-400 font-bold">
          Genres:{" "}
          {tvShowDetail?.genres?.map((genre, id) => (
            <span key={id}>
              {id > 0 && <span className="text-black mx-1 font-normal">|</span>}

              <span className="text-red-600 font-normal">{genre}</span>
            </span>
          ))}
        </h1>
        <h1 className="mb-4 text-2xl dark:text-gray-400 font-bold">
          Station:{" "}
          <span className=" font-normal">
            {tvShowDetail?.network} ({tvShowDetail?.country})
          </span>
        </h1>
        <h1 className="mb-4 text-2xl dark:text-gray-400 font-bold">
          Rating:{" "}
          <span className=" font-normal">
            <span className="text-red-600">
              {" "}
              {Math.trunc(parseFloat(tvShowDetail?.rating) * 10) / 10}/10{" "}
              {/* {tvShowDetail?.rating}/10{" "} */}
            </span>{" "}
            from{" "}
            <span className="text-red-600">{tvShowDetail?.rating_count}</span>{" "}
            users
          </span>
        </h1>
      </div>
      <div>
        <h1 className="mb-4 text-2xl dark:text-gray-400 font-bold">
          Status:{" "}
          {tvShowDetail?.status === "Ended" ? (
            <span className=" font-normal text-red-600">
              {tvShowDetail?.status}
            </span>
          ) : (
            <span className=" font-normal text-green-500">
              {tvShowDetail?.status}
            </span>
          )}
        </h1>

        <h1 className="mb-4 text-2xl dark:text-gray-400 font-bold">
          Start Date:{" "}
          <span className=" font-normal">{tvShowDetail?.start_date}</span>
        </h1>

        <h1 className="mb-4 text-2xl dark:text-gray-400 font-bold">
          Total Episodes:{" "}
          <span className=" font-normal">{tvShowDetail?.episodes?.length}</span>
        </h1>
      </div>
    </div>
  );
};

export default React.memo(TvShowPerformanceDetail);
