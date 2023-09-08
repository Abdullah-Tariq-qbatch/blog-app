import React, { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import { Link } from "react-router-dom";
import { calculateYear } from "../../utils/tvShowApp/utils";
import { toast } from "react-toastify";
import { EyeFilled, DeleteFilled } from "@ant-design/icons";

const TvShowCard = ({ data }) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const startDate = data.start_date;
  const endDate = data.end_date;

  return (
    <>
      <div className="max-w-sm bg-white dark:bg-gray-950 border dark:border-gray-950 border-gray-200 rounded-lg shadow flex flex-col">
        <div className="relative z-10">
          <img
            src={data.image_thumbnail_path}
            className="rounded-t-lg w-96 h-44"
          />
          <span
            id="blackOverlay"
            className="w-full rounded-t-lg h-full absolute top-0 left-1/2 transform -translate-x-1/2 bg-black opacity-0 dark:opacity-30 flex justify-center items-center"
          />
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-900 rounded-lg px-5 -mt-14 mx-auto w-11/12 mb-5 z-10">
          <div className="flex justify-center h-[50px] items-center">
            <p className="w-[90%] text-base font-bold text-center tracking-tight text-gray-700 dark:text-gray-50 hover:text-pink-custom dark:hover:text-pink-800 overflow-hidden whitespace-nowrap overflow-ellipsis">
              {data.name}
            </p>
          </div>

          <div className="flex justify-center">
            {endDate ? (
              <p className="text-s text-gray-400 dark:text-gray-200 flex items-center">
                {calculateYear(startDate)} - {calculateYear(endDate)}
              </p>
            ) : (
              <p className="text-s text-gray-400 dark:text-gray-200 flex items-center">
                {calculateYear(startDate)} - Present
              </p>
            )}
          </div>

          <div className="pt-4 items-center justify-between flex border-t-[1px] border-black mt-4 mb-4">
            <button
              onClick={() => setConfirmationVisible(true)}
              className="inline-flex items-center p-2 text-lg font-medium text-center text-gray-400 dark:bg-gray-800 bg-gray-50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-[1px] focus:outline-none focus:ring-gray-50"
            >
              <DeleteFilled className="text-red-custom" />
            </button>

            {data?.myShow ? (
              <button
                onClick={() =>
                  toast.error("You don't have any details of your own TV-Show")
                }
                className="inline-flex items-center p-2 text-lg font-medium text-center text-gray-400 dark:bg-gray-800 bg-gray-50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-[1px] focus:outline-none focus:ring-gray-50"
              >
                {/* {viewDetailsIcon()} */}
                <EyeFilled className="text-blue-custom" />
              </button>
            ) : (
              <Link
                to={`/tv-shows/tv-show-details/${data.id}`}
                className="inline-flex items-center p-2 text-lg font-medium text-center text-gray-400 dark:bg-gray-800 bg-gray-50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-[1px] focus:outline-none focus:ring-gray-50"
              >
                {/* {viewDetailsIcon()} */}
                <EyeFilled className="text-blue-custom" />
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
