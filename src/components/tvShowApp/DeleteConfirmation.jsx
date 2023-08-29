/* eslint-disable react/prop-types */
import React from "react";
import { removeTvShow } from "../../redux/shows/actionCreator";
import { useDispatch } from "react-redux";

const DeleteConfirmation = ({ data }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeTvShow(id));
    data.setConfirmationVisible(false);
  };

  return (
    <div
      id="confirmation-alert"
      className="z-10 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete this show?
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => handleDelete(data.id)}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Delete
          </button>
          <button
            onClick={() => data.setConfirmationVisible(false)}
            className="ml-2 px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DeleteConfirmation);
