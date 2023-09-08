import React from "react";

const TvShowPerformanceDetail = ({ tvShowDetail }) => {
  return (
    <div className="lg:px-30 flex  flex-col justify-center px-6 md:px-12 lg:flex-row lg:space-x-48">
      <div>
        <h1 className="mb-4 break-words text-2xl font-bold dark:text-gray-400">
          Genres:{" "}
          {tvShowDetail?.genres?.map((genre, id) => (
            <span key={id}>
              {id > 0 && <span className="mx-1 font-normal text-black">|</span>}

              <span className="font-normal text-red-600">{genre}</span>
            </span>
          ))}
        </h1>
        <h1 className="mb-4 text-2xl font-bold dark:text-gray-400">
          Station:{" "}
          <span className=" font-normal">
            {tvShowDetail?.network} ({tvShowDetail?.country})
          </span>
        </h1>
        <h1 className="mb-4 text-2xl font-bold dark:text-gray-400">
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
        <h1 className="mb-4 text-2xl font-bold dark:text-gray-400">
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

        <h1 className="mb-4 text-2xl font-bold dark:text-gray-400">
          Start Date:{" "}
          <span className=" font-normal">{tvShowDetail?.start_date}</span>
        </h1>

        <h1 className="mb-4 text-2xl font-bold dark:text-gray-400">
          Total Episodes:{" "}
          <span className=" font-normal">{tvShowDetail?.episodes?.length}</span>
        </h1>
      </div>
    </div>
  );
};

export default React.memo(TvShowPerformanceDetail);
