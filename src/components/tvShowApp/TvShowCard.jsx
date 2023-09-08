import { DeleteFilled, EyeFilled } from "@ant-design/icons";
import React, { useState } from "react";

import DeleteConfirmation from "./DeleteConfirmation";
import { Link } from "react-router-dom";
import { calculateYear } from "../../utils/tvShowApp/utils";
import { toast } from "react-toastify";

const TvShowCard = ({ data }) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const startDate = data.start_date;
  const endDate = data.end_date;

  return (
    <>
      <div className="flex max-w-sm flex-col rounded-lg border border-gray-200 bg-white shadow dark:border-gray-950 dark:bg-gray-950">
        <div className="relative z-10">
          <img
            src={data.image_thumbnail_path}
            className="h-64 w-96 rounded-t-lg 2xl:object-scale-down"
          />
          <span
            id="blackOverlay"
            className="absolute left-1/2 top-0 flex h-full w-full -translate-x-1/2 transform items-center justify-center rounded-t-lg bg-black opacity-0 dark:opacity-30"
          />
        </div>
        <div className="z-10 mx-auto -mt-14 mb-5 w-11/12 rounded-lg border-2 border-gray-100 bg-gray-50 px-5 dark:border-gray-900 dark:bg-gray-800">
          <div className="flex h-[50px] items-center justify-center">
            <p className="w-[90%] overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-base font-bold tracking-tight text-gray-700 hover:text-pink-custom dark:text-gray-50 dark:hover:text-pink-800">
              {data.name}
            </p>
          </div>

          <div className="flex justify-center">
            {endDate ? (
              <p className="text-s flex items-center text-gray-400 dark:text-gray-200">
                {calculateYear(startDate)} - {calculateYear(endDate)}
              </p>
            ) : (
              <p className="text-s flex items-center text-gray-400 dark:text-gray-200">
                {calculateYear(startDate)} - Present
              </p>
            )}
          </div>

          <div className="mb-4 mt-4 flex items-center justify-between border-t-[1px] border-black pt-4">
            <button
              onClick={() => setConfirmationVisible(true)}
              className="inline-flex items-center rounded-lg bg-gray-50 p-2 text-center text-lg font-medium text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-[1px] focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <DeleteFilled
                className="text-red-custom"
                title="Delete TV Show"
              />
            </button>

            {data?.myShow ? (
              <button
                onClick={() =>
                  toast.error("You don't have any details of your own TV-Show")
                }
                className="inline-flex items-center rounded-lg bg-gray-50 p-2 text-center text-lg font-medium text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-[1px] focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                {/* {viewDetailsIcon()} */}
                <EyeFilled className="text-blue-custom" title="View Details" />
              </button>
            ) : (
              <Link
                to={`/tv-shows/${data.id}`}
                className="inline-flex items-center rounded-lg bg-gray-50 p-2 text-center text-lg font-medium text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-[1px] focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                {/* {viewDetailsIcon()} */}
                <EyeFilled className="text-blue-custom" title="View Details" />
              </Link>
            )}
          </div>
        </div>
        <div className="z-20">
          {isConfirmationVisible && (
            <DeleteConfirmation
              data={{ id: data.id, setConfirmationVisible }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TvShowCard;
