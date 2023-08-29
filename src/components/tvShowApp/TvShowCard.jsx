/* eslint-disable react/prop-types */
import React, { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import { Link } from "react-router-dom";
import { calculateYear } from "../../utils/tvShowApp/utils";
import { toast } from "react-toastify";
import { viewDetailsIcon, deleteIcon } from "../../assets/tvShowApp/svg/icons";

const TvShowCard = ({ data }) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const startDate = data.start_date;
  const endDate = data.end_date;

  return (
    <>
      <div
        className="relative w-full max-w-xs bg-white border flex justify-center border-gray-200 rounded-lg shadow"
        style={{
          backgroundImage: `url(${data.image_thumbnail_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 200px",
        }}
      >
        <div className="px-5 w-11/12 mt-36 pt-4 pb-6 bg-gray-50 shadow-lg hover:shadow-xl shadow-black-600 rounded-lg">
          <a href="#">
            <p className="text-xl  font-bold text-gray-900  overflow-hidden whitespace-nowrap overflow-ellipsis">
              {data.name}{" "}
            </p>
            {endDate ? (
              <p className="text-l font-semibold tracking-tight text-gray-400">
                {calculateYear(startDate)} - {calculateYear(endDate)}
              </p>
            ) : (
              <p className="text-l font-semibold tracking-tight text-gray-400">
                {calculateYear(startDate)} - Present
              </p>
            )}
          </a>

          <div className="pt-4 items-center justify-between flex ">
            <button
              onClick={() => setConfirmationVisible(true)}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-center text-white rounded-lg bg-gradient-to-r from-red-300 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800"
            >
              {deleteIcon()}
              Delete
            </button>

            {data?.myShow ? (
              <button
                onClick={() =>
                  toast.error("You don't have any details of your own TV-Show")
                }
                className="inline-flex items-center px-2.5 py-2 text-xs font-medium text-center text-white rounded-lg bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                {viewDetailsIcon()}
                Details
              </button>
            ) : (
              <Link
                to={`/tv-shows/tv-show-details/${data.id}`}
                className="inline-flex items-center px-2.5 py-2 text-xs font-medium text-center text-white rounded-lg bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                {viewDetailsIcon()}
                Details
              </Link>
            )}
            {isConfirmationVisible && (
              <DeleteConfirmation
                data={{ id: data.id, setConfirmationVisible }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TvShowCard;
