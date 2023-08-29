/* eslint-disable react/prop-types */
import React from "react";

import Button from "./../Button/Button";
import "../../../index.css"
import { ReactComponent as DeleteIcon } from "./../../../assets/social-media-feed/svgs/delete-icon.svg";
import { ReactComponent as CancelIcon } from "./../../../assets/social-media-feed/svgs/cancel-icon.svg";

const DeleteConfirmation = ({ onClickDelete, onClickCancel }) => {
  return (
    <div
      id="confirmation-alert"
      className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-10"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-700 mb-4">Are you sure you want to delete?</p>
        <div className="flex justify-end">
          <div className="ml-20">
            <Button onClick={onClickDelete}>
              <DeleteIcon className="h-5 w-5 mr-2" strokeWidth="2" />
              Delete
            </Button>
          </div>
          <div className="ml-4">
            <Button onClick={onClickCancel}>
              <CancelIcon />
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DeleteConfirmation);
