import React from "react";

import Button from "./Button";

import "../../catalog.css";

const DeleteConfirmation = ({ id, handleDelete, setIsDialogVisible }) => {
  return (
    <div
      id="confirmation-alert"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete this Product?
        </p>
        <div className="flex justify-end">
          <Button
            onClick={() => handleDelete(id)}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
            label="Delete"
          />
          <Button
            onClick={() => setIsDialogVisible(false)}
            className="ml-2 px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg"
            label="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(DeleteConfirmation);
