import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../index.css";

import DeleteMessage from "../../DeleteMessage/DeleteMessage";
import Avatar from "../../Avatar/Avatar";
import Button from "../../Button/Button";

import { deleteAUser } from "./../../../../redux/users/actionCreator";
import { ReactComponent as DeleteIcon } from "./../../../../assets/social-media-feed/svgs/delete-icon.svg";
import { ReactComponent as ViewIcon } from "./../../../../assets/social-media-feed/svgs/view-icon.svg";

const User = ({ id, firstName, lastName, gender }) => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const deleteUser = () => {
    setAlert(true);
  };
  const handleOnClickDelete = () => {
    dispatch(deleteAUser(id));
  };
  const handleOnClickCancel = () => {
    setAlert(false);
  };

  const handleNavigate = () => {
    navigate(`/social-media/posts-feed/user?userid=${id}`);
  };

  return (
    <>
      <div className="flex justify-center dark:text-white">
        <div className="w-full bg-white-400 max-w-sm text-center border-[1px] shadow-lg border-gray-300 rounded-lg bg-gray-200 dark:bg-[#4b5563] dark:border-[#4b5563]">
          <div className="flex flex-col items-center py-10 ">
            <Avatar
              initials={firstName[0] + lastName[0]}
              type="user-feed"
              size="sm"
            />
            <h5 className="my-2 text-xl font-medium text-gray-900 dark:text-white">
              {firstName + " " + lastName}
            </h5>
            <span className="text-sm text-gray-500 dark:text-white">
              {gender.toUpperCase()}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <Button type="button" onClick={deleteUser}>
                <DeleteIcon className="h-5 w-5 mr-2" />
                Delete
              </Button>
              <Button onClick={handleNavigate}>
                <ViewIcon />
                View Posts
              </Button>
            </div>
          </div>
        </div>
      </div>
      {alert && (
        <DeleteMessage
          onClickDelete={handleOnClickDelete}
          onClickCancel={handleOnClickCancel}
        ></DeleteMessage>
      )}
    </>
  );
};

export default React.memo(User);
