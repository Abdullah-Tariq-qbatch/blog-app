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

const User = ({ id, firstName, lastName, gender, maidenName }) => {
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
        <div className="bg-white-400 w-full max-w-sm rounded-lg border-[1px] border-gray-300 bg-gray-200 text-center shadow-lg dark:border-[#4b5563] dark:bg-[#4b5563]">
          <div className="flex flex-col items-center py-10 ">
            <Avatar
              initials={firstName[0] + lastName[0]}
              type="user-feed"
              size="sm"
            />
            <h5 className="my-2 text-xl font-medium text-gray-900 dark:text-white">
              {firstName + " " + maidenName + " " + lastName}
            </h5>
            <span className="text-sm text-gray-500 dark:text-white">
              {gender.toUpperCase()}
            </span>
            <div className="mt-4 flex space-x-3 md:mt-6">
              <Button type="button" onClick={deleteUser}>
                <DeleteIcon className="mr-2 h-5 w-5" />
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
